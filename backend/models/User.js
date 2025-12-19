const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
    this.role = userData.role || 'user';
    this.created_at = userData.created_at;
    this.updated_at = userData.updated_at;
  }

  // Crear un nuevo usuario
  static async create(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const [result] = await pool.execute(
        'INSERT INTO users (username, email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)',
        [userData.username, userData.email, hashedPassword, userData.first_name, userData.last_name, userData.role || 'user']
      );

      return await User.findById(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuario por ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows.length > 0 ? new User(rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuario por username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows.length > 0 ? new User(rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows.length > 0 ? new User(rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los usuarios
  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');
      return rows.map(row => new User(row));
    } catch (error) {
      throw error;
    }
  }

  // Actualizar usuario
  static async update(id, userData) {
    try {
      const updateFields = [];
      const values = [];

      if (userData.username) {
        updateFields.push('username = ?');
        values.push(userData.username);
      }
      if (userData.email) {
        updateFields.push('email = ?');
        values.push(userData.email);
      }
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        updateFields.push('password = ?');
        values.push(hashedPassword);
      }
      if (userData.first_name !== undefined) {
        updateFields.push('first_name = ?');
        values.push(userData.first_name);
      }
      if (userData.last_name !== undefined) {
        updateFields.push('last_name = ?');
        values.push(userData.last_name);
      }
      if (userData.role) {
        updateFields.push('role = ?');
        values.push(userData.role);
      }

      if (updateFields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      
      await pool.execute(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
        values
      );

      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Eliminar usuario
  static async delete(id) {
    try {
      const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Verificar contraseña
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Convertir a JSON (sin incluir la contraseña)
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;