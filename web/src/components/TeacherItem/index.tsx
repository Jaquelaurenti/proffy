import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/39747516?s=460&u=db1208fdfb7dba918b0d09e00881d36ac6646f0b&v=4"
          alt="Jaque Laurenti"
        />
        <div>
          <strong>Jaque Laurenti</strong>
          <span>Análise e Desenvolvimento de Sistemas</span>
        </div>
      </header>

      <p>
        Desenvolvedora, Girl Power, entusiasmada com tudo que é tecnologia,
        <br />
        <br />
        Apaixonada por tecnologia, curiosa, gosto de conhecer várias linguagens de programação
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
