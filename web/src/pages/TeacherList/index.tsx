import React from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import './styles.css'
import Select from '../../components/Select';


function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os professores disponíveis">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: "Artes", label: "Artes"},
              { value: "Biologia", label: "Biologia"},
              { value: "Quimíca", label: "Quimíca"},
              { value: "Matemática", label: "Matemática"},
              { value: "Programação", label: "Programação"},
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            options={[
              { value: "0", label: "Domingo"},
              { value: "1", label: "Segunda"},
              { value: "2", label: "Terça"},
              { value: "3", label: "Quarta"},
              { value: "4", label: "Quinta"},
              { value: "5", label: "Sexta"},
              { value: "6", label: "Sabádo"},
            ]}
          />
          <Input type="time" name="time" label="Hora"/>
        </form>
      </PageHeader>
      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
}

export default TeacherList;
