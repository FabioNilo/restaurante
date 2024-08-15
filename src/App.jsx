import  { useState } from 'react';
import logo from './cika.png';
import "./App.css"

const QuentinhaApp = () => {
  const [selectedItems, setSelectedItems] = useState({
    acompanhamentos: [],
    proteina: '',
    salada: ''
  });
  const [name, setName] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [filteredBairros, setFilteredBairros] = useState([]);
  const [orders, setOrders] = useState([]); // Para armazenar os pedidos
  const [showCart, setShowCart] = useState(false); // Controla a exibição do carrinho

  const opcoes = {
    acompanhamentos: ['Feijão de Caldo', 'Feijão Tropeiro', 'Macarrão', 'Arroz', 'Farofa'],
    proteinas: ['Carne de Panela', 'Frango Milanesa', 'Bife Acebolado'],
    saladas: ['Tomate', 'Repolho', 'Maionese']
  };

  const bairros = [
    "Aritaguá",
      "Banco Central",
      "Castelo Novo",
      "Coutos",
      "Inema",
      "Japu",
      "Olivença",
      "Pimenteira",
      "Rio do Braço",
      "Sambaituba", 
      "Pontal",
      "Conquista",
      "São Sebastião",
      "Hernani Sá",
      "Malhado",
      "Alto do Carvalho",
      "Alto do Ceará",
      "Alto dos Coqueiros",
      "Alto da Esperança",
      "Cidade Nova",
      "Tapera",
      "Basílio",
      "Formoso",
      "Soledade",
      "Coqueiro",
      "São João",
      "Nerival",
      "Avenida Palmares",
      "Barra",
      "Iguape",
  ];
  const handleAcompanhamentoSelect = (item) => {
    setSelectedItems(prev => {
      const newAcompanhamentos = prev.acompanhamentos.includes(item)
        ? prev.acompanhamentos.filter(i => i !== item)
        : [...prev.acompanhamentos, item];
      if (newAcompanhamentos.length > 3) {
        newAcompanhamentos.shift();
      }
      return { ...prev, acompanhamentos: newAcompanhamentos };
    });
  };

  const handleItemSelect = (category, value) => {
    setSelectedItems(prev => ({ ...prev, [category]: value }));
  };

  const handleBairroChange = (e) => {
    const value = e.target.value;
    setBairro(value);
    const filtered = bairros.filter(b => 
      b.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBairros(filtered);
  };

  const handleBairroSelect = (selectedBairro) => {
    setBairro(selectedBairro);
    setFilteredBairros([]);
  };

  const handleAddOrder = () => {
    const newOrder = {
      acompanhamentos: selectedItems.acompanhamentos,
      proteina: selectedItems.proteina,
      salada: selectedItems.salada,
      name,
      rua,
      bairro
    };

  
    setOrders([...orders, newOrder]);

    // Limpar o formulário para o próximo pedido
    setSelectedItems({ acompanhamentos: [], proteina: '', salada: '' });
    setName('');
    setRua('');
    setBairro('');
  };

  const handleRemoveOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  const handleSubmitOrders = () => {
    const orderMessages = orders.map((order, index) => `
  
    Pedido ${index + 1}:
  - Acompanhamentos: ${order.acompanhamentos.join(', ')}
  - Proteína: ${order.proteina}
  - Salada: ${order.salada}
  - Nome: ${order.name}
  - Endereço: ${order.rua}, ${order.bairro}
    `);
    const message = encodeURIComponent(`
Olá! Gostaria de fazer os seguintes pedidos:

${orderMessages.join('\n\n')}


Total: R$ ${orders.length * 15},00
    `);

    window.open(`https://wa.me/5573999099040?text=${message}`,'_blank');
  };

  const isFormValid = () => {
    console.log("Proteina:", selectedItems.proteina);
    console.log("Salada:", selectedItems.salada);
    console.log("Acompanhamentos:", selectedItems.acompanhamentos);
    console.log("Nome:", name);
    console.log("Rua:", rua);
    console.log("Bairro:", bairro);
    return (
      selectedItems.proteina !== '' &&
      selectedItems.salada !== '' &&
      selectedItems.acompanhamentos.length > 0 &&
      name.trim() !== '' &&
      rua.trim() !== '' &&
      bairro.trim() !== ''
    );
  };
  

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logotipo da Empresa" className="logo" />
      </div>
      <h1>Monte sua Quentinha</h1>

      {/* Botão para mostrar/ocultar o carrinho */}
      <button 
        onClick={() => setShowCart(!showCart)} 
        className="cart-button"
      >
        Carrinho ({orders.length})
      </button>

      {showCart && (
        <div className="cart">
          <h2>Resumo dos Pedidos</h2>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                <p>Pedido {index + 1}:</p>
                <p>Acompanhamentos: {order.acompanhamentos.join(', ')}</p>
                <p>Proteína: {order.proteina}</p>
                <p>Salada: {order.salada}</p>
                <p>Nome: {order.name}</p>
                <p>Endereço: {order.rua}, {order.bairro}</p>
                <button onClick={() => handleRemoveOrder(index)}>Remover</button>
              </li>
            ))}
          </ul>
          <button 
            onClick={handleSubmitOrders} 
            className="submit-button"
            disabled={orders.length === 0}
          >
            Enviar todos os pedidos via WhatsApp
          </button>
        </div>
      )}

      <form className="quentinha-form">
        <div className="form-group">
          <label>Acompanhamentos (escolha até 3):</label>
          <div className="checkbox-group">
            {opcoes.acompanhamentos.map((item, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedItems.acompanhamentos.includes(item)}
                  onChange={() => handleAcompanhamentoSelect(item)}
                  disabled={selectedItems.acompanhamentos.length >= 3 && !selectedItems.acompanhamentos.includes(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {['proteina', 'salada'].map((category) => (
          <div key={category} className="form-group">
            <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
            <select
              id={category}
              value={selectedItems[category]}
              onChange={(e) => handleItemSelect(category, e.target.value)}
              required
            >
              <option value="">Selecione {category}</option>
              {opcoes[`${category}s`].map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="name">Seu nome:</label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rua">Nome da rua:</label>
          <input 
            id="rua"
            type="text" 
            value={rua} 
            onChange={(e) => setRua(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bairro">Seu bairro:</label>
          <div className="autocomplete">
            <input 
              id="bairro"
              type="text" 
              value={bairro} 
              onChange={handleBairroChange} 
              required
            />
            {filteredBairros.length > 0 && (
              <div className="autocomplete-items">
                {filteredBairros.map((item, index) => (
                  <div key={index} onClick={() => handleBairroSelect(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          type="button" 
          className="submit-button" 
          onClick={handleAddOrder}
          disabled={!isFormValid()}
        >
          Adicionar ao Carrinho
        </button>
      </form>
    </div>
  );
};

export default QuentinhaApp;