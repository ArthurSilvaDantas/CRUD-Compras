import { pool } from '../config/database.js';

const Produto = {
  async getAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM produtos ORDER BY id'
      );
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao buscar produtos: ' + error.message);
    }
  },

  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM produtos WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao buscar produto: ' + error.message);
    }
  },

  async getByCategoria(categoria) {
    try {
      const result = await pool.query(
        'SELECT * FROM produtos WHERE categoria = $1 ORDER BY nome',
        [categoria]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao buscar produtos por categoria: ' + error.message);
    }
  },

  async create(data) {
    const { nome, descricao, preco, estoque, categoria } = data;
    
    try {
      const result = await pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, categoria) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [nome, descricao || null, preco, estoque || 0, categoria || null]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao criar produto: ' + error.message);
    }
  },

  async update(id, data) {
    const { nome, descricao, preco, estoque, categoria } = data;
    
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
      if (descricao !== undefined) {
        fields.push(`descricao = $${paramCount++}`);
        values.push(descricao);
      }
      if (preco !== undefined) {
        fields.push(`preco = $${paramCount++}`);
        values.push(preco);
      }
      if (estoque !== undefined) {
        fields.push(`estoque = $${paramCount++}`);
        values.push(estoque);
      }
      if (categoria !== undefined) {
        fields.push(`categoria = $${paramCount++}`);
        values.push(categoria);
      }

      fields.push(`atualizado_em = CURRENT_TIMESTAMP`);
      values.push(id);

      const query = `
        UPDATE produtos 
        SET ${fields.join(', ')} 
        WHERE id = $${paramCount}
        RETURNING *
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao atualizar produto: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM produtos WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao deletar produto: ' + error.message);
    }
  },

  async updateEstoque(id, quantidade) {
    try {
      const result = await pool.query(
        `UPDATE produtos 
         SET estoque = estoque + $1, atualizado_em = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *`,
        [quantidade, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao atualizar estoque: ' + error.message);
    }
  },

  validations: {
    nome: (value) => value && value.length >= 3,
    preco: (value) => value && parseFloat(value) > 0,
    estoque: (value) => value !== undefined && parseInt(value) >= 0
  }
};

export default Produto;
