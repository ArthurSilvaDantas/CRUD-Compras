import { pool } from '../config/database.js';

const Usuario = {
  async getAll() {
    try {
      const result = await pool.query(
        'SELECT id, nome, email, telefone, criado_em, atualizado_em FROM usuarios ORDER BY id'
      );
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message);
    }
  },

  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT id, nome, email, telefone, criado_em, atualizado_em FROM usuarios WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  },

  async getByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao buscar usuário por email: ' + error.message);
    }
  },

  async create(data) {
    const { nome, email, senha, telefone } = data;
    
    try {
      const result = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, telefone) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, nome, email, telefone, criado_em, atualizado_em`,
        [nome, email, senha, telefone || null]
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email já cadastrado');
      }
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  },

  async update(id, data) {
    const { nome, email, telefone, senha } = data;
    
    try {
      const exists = await this.getById(id);
      if (!exists) {
        return null;
      }

      const fields = [];
      const values = [];
      let paramCount = 1;

      if (nome !== undefined) {
        fields.push(`nome = $${paramCount++}`);
        values.push(nome);
      }
      if (email !== undefined) {
        fields.push(`email = $${paramCount++}`);
        values.push(email);
      }
      if (telefone !== undefined) {
        fields.push(`telefone = $${paramCount++}`);
        values.push(telefone);
      }
      if (senha !== undefined) {
        fields.push(`senha = $${paramCount++}`);
        values.push(senha);
      }

      fields.push(`atualizado_em = CURRENT_TIMESTAMP`);
      values.push(id);

      const query = `
        UPDATE usuarios 
        SET ${fields.join(', ')} 
        WHERE id = $${paramCount}
        RETURNING id, nome, email, telefone, criado_em, atualizado_em
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email já cadastrado');
      }
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  },

  validations: {
    nome: (value) => value && value.length >= 3,
    email: (value) => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    senha: (value) => value && value.length >= 6
  }
};

export default Usuario;
