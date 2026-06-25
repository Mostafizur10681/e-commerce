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
        const response = await api.put('/customer/profile', {
          name: updatedFields.name,
          phone: updatedFields.phone,
          gender: updatedFields.gender || null,
          date_of_birth: updatedFields.date_of_birth || null,
          shipping_address: updatedFields.shipping_address || null,
          billing_address: updatedFields.billing_address || null,
        });

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
        if (error.response && error.response.data) {
          errorMsg = error.response.data.message || errorMsg;
        }
        return { success: false, error: errorMsg };
      }
    },

    async deleteProfile() {
      this.logout();
      return { success: true };
    }
  }
});
