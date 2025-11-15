import { pool } from '../config/database.js';

const Pedido = {
  async getAll() {
    try {
      const result = await pool.query(`
        SELECT * FROM pedidos 
        ORDER BY id DESC
      `);
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao buscar pedidos: ' + error.message);
    }
  },

  async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM pedidos WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao buscar pedido: ' + error.message);
    }
  },

  async getByUsuarioId(usuarioId) {
    try {
      const result = await pool.query(
        'SELECT * FROM pedidos WHERE usuario_id = $1 ORDER BY id DESC',
        [usuarioId]
      );
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao buscar pedidos do usuário: ' + error.message);
    }
  },

  async create(data) {
    const { usuarioId, status, total } = data;
    
    try {
      const result = await pool.query(
        'INSERT INTO pedidos (usuario_id, status, total) VALUES ($1, $2, $3) RETURNING *',
        [usuarioId, status || 'pendente', total || 0]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao criar pedido: ' + error.message);
    }
  },

  async update(id, data) {
    const { status, total } = data;
    
    try {
      const result = await pool.query(
        `UPDATE pedidos 
         SET status = COALESCE($1, status), 
             total = COALESCE($2, total),
             atualizado_em = CURRENT_TIMESTAMP
         WHERE id = $3 
         RETURNING *`,
        [status, total, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao atualizar pedido: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM pedidos WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao deletar pedido: ' + error.message);
    }
  }
};

export default Pedido;
