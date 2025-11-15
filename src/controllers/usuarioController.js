import Usuario from '../models/Usuario.js';

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.status(200).json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao listar usuários'
    });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao buscar usuário'
    });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e senha são obrigatórios'
      });
    }

    if (!Usuario.validations.email(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    if (!Usuario.validations.senha(senha)) {
      return res.status(400).json({
        success: false,
        error: 'Senha deve ter no mínimo 6 caracteres'
      });
    }

    const usuario = await Usuario.create({ nome, email, senha, telefone });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao criar usuário'
    });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;
    const usuario = await Usuario.update(req.params.id, { nome, email, senha, telefone });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao atualizar usuário'
    });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao deletar usuário'
    });
  }
};
