import Produto from '../models/Produto.js';

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.getAll();
    res.status(200).json({
      success: true,
      count: produtos.length,
      data: produtos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao listar produtos'
    });
  }
};

export const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.getById(req.params.id);
    
    if (!produto) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: produto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao buscar produto'
    });
  }
};

export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria } = req.body;

    if (!nome || !preco || estoque === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Nome, preço e estoque são obrigatórios'
      });
    }

    if (!Produto.validations.preco(preco)) {
      return res.status(400).json({
        success: false,
        error: 'Preço deve ser maior que 0'
      });
    }

    if (!Produto.validations.estoque(estoque)) {
      return res.status(400).json({
        success: false,
        error: 'Estoque deve ser maior ou igual a 0'
      });
    }

    const produto = await Produto.create({ nome, descricao, preco, estoque, categoria });

    res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: produto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao criar produto'
    });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria } = req.body;
    const produto = await Produto.update(req.params.id, { nome, descricao, preco, estoque, categoria });

    if (!produto) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: produto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao atualizar produto'
    });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const deleted = await Produto.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao deletar produto'
    });
  }
};
