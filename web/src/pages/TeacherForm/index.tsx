import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setScheduleItems] = useState([
      { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
      setScheduleItems([
        ...scheduleItems,
        { week_day: 0, from: '', to: '' }
      ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value }
        }

        return scheduleItem;

      });

      setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
      e.preventDefault();

      api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      }).then(() => {
        alert('Cadastro realizado com sucess0');
        history.push('/');
      }).catch(() =>{
        alert('Erro!');
      })
    }

    return (
    <div id="page-teacher-form" className="container">
        <PageHeader title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher o formulário abaixo:"/>
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Suas Informações</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {setAvatar(e.target.value)}}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {setWhatsapp(e.target.value)}}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {setBio(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {setSubject(e.target.value)}}
              options={[
                { value: 'Literature', label: 'Literature'},
                { value: 'Speech', label: 'Speech'},
                { value: 'Writing or Composition', label: 'Writing or Composition'},
                { value: 'Algebra', label: 'Algebra'},
                { value: 'Algebra 2', label: 'Algebra II'},
                { value: 'Geometry', label: 'Geometry'},
                { value: 'World History', label: 'World History'},
                { value: 'Spanish', label: 'Spanish'},
                { value: 'German', label: 'German'},
                { value: 'French', label: 'French'},
                { value: 'Chemistry', label: 'Chemistry'},
                { value: 'Physics', label: 'Physics'},
              ]}
            />
            <Input
              name="cost"
              label="Preço por Hora"
              value={cost}
              onChange={(e) => {setCost(e.target.value)}}
            />
          </fieldset>

          <fieldset>
            <legend>Horário
              <button type="button" onClick={addNewScheduleItem}>
                  + Mais Horários
              </button>
            </legend>

          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
              <Select
                name="weed_day"
                label="Week Day"
                value={scheduleItem.week_day}
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options={[
                  { value: '0', label: 'Domingo'},
                  { value: '1', label: 'Segunda'},
                  { value: '2', label: 'Terça'},
                  { value: '3', label: 'Quarta'},
                  { value: '4', label: 'Quinta'},
                  { value: '5', label: 'Sexta'},
                  { value: '6', label: 'Sabádo'},
                ]}
              />
              <Input
                name="from"
                label="From"
                type="time"
                value={scheduleItem.from}
                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
              />
              <Input
                name="to"
                label="to"
                type="time"
                value={scheduleItem.to}
                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
              />
            </div>
            )
          })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Atenção"/>
              Atenção! <br />
              Preencha todos os dados!
            </p>
            <button type="submit">
              Cadastrar
            </button>
          </footer>
        </form>
      </main>
    </div>

  );
}

export default TeacherForm;
