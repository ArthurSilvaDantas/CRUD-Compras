import Pedido from '../models/Pedido.js';

export const listarPedidos = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    
    let pedidos;
    if (usuarioId) {
      pedidos = await Pedido.getByUsuarioId(usuarioId);
    } else {
      pedidos = await Pedido.getAll();
    }

    res.status(200).json({
      success: true,
      count: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao listar pedidos'
    });
  }
};

export const buscarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.getById(req.params.id);
    
    if (!pedido) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: pedido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao buscar pedido'
    });
  }
};

export const criarPedido = async (req, res) => {
  try {
    const { usuarioId, produtos, status } = req.body;

    if (!usuarioId || !produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'UsuarioId e produtos (array) são obrigatórios'
      });
    }

    const produtosValidos = produtos.every(p => p.produtoId && p.quantidade && p.preco);
    if (!produtosValidos) {
      return res.status(400).json({
        success: false,
        error: 'Cada produto deve ter produtoId, quantidade e preco'
      });
    }

    const pedido = await Pedido.create({ usuarioId, produtos, status });

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: pedido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao criar pedido'
    });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { produtos, status } = req.body;
    const pedido = await Pedido.update(req.params.id, { produtos, status });

    if (!pedido) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: pedido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao atualizar pedido'
    });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const deleted = await Pedido.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pedido deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao deletar pedido'
    });
  }
};
