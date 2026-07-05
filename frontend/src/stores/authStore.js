import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null;
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        user = JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse currentUser from localStorage', e);
    }
    return {
      currentUser: user,
    };
  },
  actions: {
    async login(emailOrPhone, password) {
      try {
        const response = await api.post('/customer/login', {
          email: emailOrPhone.trim(),
          password: password,
        });

        if (response.data && response.data.success) {
          const { user, access_token } = response.data.data;
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('auth_token', access_token);
          return { success: true };
        } else {
          return { success: false, error: response.data.message || 'Login failed' };
        }
      } catch (error) {
        console.error('Login error:', error);
        let errorMsg = 'Invalid credentials or account does not exist.';
        let fieldErrors = null;
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
          fieldErrors = error.response.data.errors || null;
        }
        return { success: false, error: errorMsg, errors: fieldErrors };
      }
    },

    async register(newUser) {
      const { name, email, phone, password } = newUser;
      try {
        const response = await api.post('/customer/register', {
          name,
          email,
          phone,
          password,
          password_confirmation: password,
        });

        if (response.data && response.data.success) {
          const { user, access_token } = response.data.data;
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('auth_token', access_token);
          return { success: true };
        } else {
          return { success: false, error: response.data.message || 'Registration failed' };
        }
      } catch (error) {
        console.error('Registration error:', error);
        let errorMsg = 'An error occurred during registration.';
        let fieldErrors = null;
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
          fieldErrors = error.response.data.errors || null;
        }
        return { success: false, error: errorMsg, errors: fieldErrors };
      }
    },

    logout() {
      api.post('/logout').catch(e => console.error('API logout failed', e));
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth_token');
    },

    async updateProfile(updatedFields) {
      try {
        let response;
        if (updatedFields.profile_pic) {
          const formData = new FormData();
          formData.append('name', updatedFields.name);
          formData.append('email', updatedFields.email);
          formData.append('phone', updatedFields.phone);
          if (updatedFields.gender) formData.append('gender', updatedFields.gender);
          if (updatedFields.date_of_birth) formData.append('date_of_birth', updatedFields.date_of_birth);
          if (updatedFields.shipping_address) formData.append('shipping_address', updatedFields.shipping_address);
          if (updatedFields.billing_address) formData.append('billing_address', updatedFields.billing_address);
          formData.append('profile_pic', updatedFields.profile_pic);
          formData.append('_method', 'PUT');

          response = await api.post('/customer/profile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          response = await api.put('/customer/profile', {
            name: updatedFields.name,
            email: updatedFields.email,
            phone: updatedFields.phone,
            gender: updatedFields.gender || null,
            date_of_birth: updatedFields.date_of_birth || null,
            shipping_address: updatedFields.shipping_address || null,
            billing_address: updatedFields.billing_address || null,
          });
        }

        if (response.data && response.data.success) {
          const { user } = response.data.data;
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return { success: true };
        } else {
          return { success: false, error: response.data.message || 'Failed to update profile' };
        }
      } catch (error) {
        console.error('Update profile error:', error);
        let errorMsg = 'An error occurred while updating profile.';
        let fieldErrors = null;
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
          fieldErrors = error.response.data.errors || null;
        }
        return { success: false, error: errorMsg, errors: fieldErrors };
      }
    },

    async changePassword(currentPassword, newPassword) {
      try {
        const response = await api.post('/change-password', {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: newPassword
        });

        if (response.data && response.data.success) {
          return { success: true };
        } else {
          return { success: false, error: response.data.message || 'Failed to change password' };
        }
      } catch (error) {
        console.error('Change password error:', error);
        let errorMsg = 'An error occurred while changing password.';
        let fieldErrors = null;
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
          fieldErrors = error.response.data.errors || null;
        }
        return { success: false, error: errorMsg, errors: fieldErrors };
      }
    },

    async deleteProfile() {
      this.logout();
      return { success: true };
    }
  }
});
