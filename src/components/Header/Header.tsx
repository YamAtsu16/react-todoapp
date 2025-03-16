import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <button
        onClick={() => navigate('/')}
        className="add-button primary"
      >
        一覧へ
      </button>
    </div>
  );
};

export default Header;
