import { defineStore } from 'pinia';

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
    login(emailOrPhone, password) {
      if (!emailOrPhone || !password) {
        return { success: false, error: 'Email/Phone and Password are required.' };
      }
      
      const q = emailOrPhone.trim().toLowerCase();
      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (e) {
        console.error('Failed to parse users list', e);
      }

      const foundUser = users.find(u => 
        (u.email?.trim().toLowerCase() === q || u.phone?.trim() === q) && 
        u.password === password
      );

      if (!foundUser) {
        return { success: false, error: 'Invalid credentials or account does not exist.' };
      }

      // Login successful
      const { password: _, ...userWithoutPassword } = foundUser;
      this.currentUser = userWithoutPassword;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true };
    },

    register(newUser) {
      const { name, email, phone, password } = newUser;
      if (!name || !email || !phone || !password) {
        return { success: false, error: 'All fields are required.' };
      }

      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (e) {
        console.error('Failed to parse users list', e);
      }

      const emailNormalized = email.trim().toLowerCase();
      const phoneNormalized = phone.trim();

      const exists = users.some(u => 
        u.email?.trim().toLowerCase() === emailNormalized || 
        u.phone?.trim() === phoneNormalized
      );

      if (exists) {
        return { success: false, error: 'Account already exists' };
      }

      const userObject = {
        id: Date.now().toString(),
        name: name.trim(),
        email: emailNormalized,
        phone: phoneNormalized,
        password,
        createdAt: new Date().toISOString()
      };

      users.push(userObject);
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true };
    },

    logout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    updateProfile(updatedFields) {
      if (!this.currentUser) return { success: false, error: 'Not authenticated.' };
      
      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (e) {
        console.error('Failed to parse users list', e);
      }

      const emailNormalized = updatedFields.email.trim().toLowerCase();
      const phoneNormalized = updatedFields.phone.trim();
      const nameTrimmed = updatedFields.name.trim();

      // Check if email or phone is already in use by another user
      const exists = users.some(u => 
        u.id !== this.currentUser.id && 
        (u.email?.trim().toLowerCase() === emailNormalized || u.phone?.trim() === phoneNormalized)
      );

      if (exists) {
        return { success: false, error: 'Email or phone number is already registered by another user.' };
      }

      // Find current user index
      const userIndex = users.findIndex(u => u.id === this.currentUser.id);
      if (userIndex === -1) {
        return { success: false, error: 'User not found in system.' };
      }

      // Update fields
      users[userIndex].name = nameTrimmed;
      users[userIndex].email = emailNormalized;
      users[userIndex].phone = phoneNormalized;

      localStorage.setItem('users', JSON.stringify(users));

      // Update current session user
      const { password, ...userWithoutPassword } = users[userIndex];
      this.currentUser = userWithoutPassword;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true };
    },

    deleteProfile() {
      if (!this.currentUser) return { success: false, error: 'Not authenticated.' };

      let users = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (e) {
        console.error('Failed to parse users list', e);
      }

      // Remove from list
      const filteredUsers = users.filter(u => u.id !== this.currentUser.id);
      localStorage.setItem('users', JSON.stringify(filteredUsers));

      // Clean up localStorage for this user
      localStorage.removeItem('addresses_' + this.currentUser.id);
      localStorage.removeItem('wishlist_' + this.currentUser.id);

      this.logout();
      return { success: true };
    }
  }
});
