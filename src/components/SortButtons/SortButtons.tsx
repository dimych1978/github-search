import React from 'react';
import { SortButtonsContainer } from './SortButtons.styled';

interface SortButtonsProps {
  handleSort: (order: 'asc' | 'desc') => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ handleSort }) => {
  return (
    <SortButtonsContainer>
      <button onClick={() => handleSort('asc')}>Сортировка (по возрастанию)</button>
      <button onClick={() => handleSort('desc')}>Сортировка (по убыванию)</button>
    </SortButtonsContainer>
  );
};

export default SortButtons;