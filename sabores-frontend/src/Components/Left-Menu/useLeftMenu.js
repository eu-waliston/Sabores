import { useState, useEffect } from "react";

const useLeftMenu = (initialCollapsed = false) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Mock data - será substituído pela API
  const mockCategories = [
    { id: 'bolos-tortas', label: 'Bolos e Tortas', count: 42, to: '/categoria/bolos-tortas' },
    { id: 'carnes', label: 'Carnes', count: 28, to: '/categoria/carnes' },
    { id: 'aves', label: 'Aves', count: 35, to: '/categoria/aves' },
    { id: 'peixes-frutos-mar', label: 'Peixes e Frutos do Mar', count: 18, to: '/categoria/peixes-frutos-mar' },
    { id: 'saladas-molhos', label: 'Saladas e Molhos', count: 56, to: '/categoria/saladas-molhos' },
    { id: 'sopas', label: 'Sopas', count: 22, to: '/categoria/sopas' },
    { id: 'massas', label: 'Massas', count: 31, to: '/categoria/massas' },
    { id: 'bebidas', label: 'Bebidas', count: 47, to: '/categoria/bebidas' },
    { id: 'doces-sobremesas', label: 'Doces e Sobremesas', count: 39, to: '/categoria/doces-sobremesas' },
    { id: 'lanches', label: 'Lanches', count: 25, to: '/categoria/lanches' },
    { id: 'alimentacao-saudavel', label: 'Alimentação Saudável', count: 33, to: '/categoria/alimentacao-saudavel' },
    { id: 'todas-receitas', label: 'Todas as Receitas', count: 312, to: '/receitas' },
  ];

  useEffect(() => {
    // TODO: Substituir pela chamada à API
    // const fetchCategories = async () => {
    //   const response = await api.get('/categories');
    //   setCategories(response.data);
    // };
    // fetchCategories();
    
    setCategories(mockCategories);
  }, []);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Aqui você pode adicionar navegação ou outras ações
    console.log('Categoria selecionada:', categoryId);
  };

  const getMenuWidth = () => {
    return isCollapsed ? 80 : 320;
  };

  return {
    isCollapsed,
    activeCategory,
    categories,
    toggleMenu,
    handleCategoryClick,
    getMenuWidth,
  };
};

export default useLeftMenu;