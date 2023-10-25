import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [stateDays, setStateDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [stateMaterias, setStateMaterias] = useState([]);

  const [weekList, setWeekList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [scheduleList, setScheduleList] = useState([]);//Lista de cronograma
  const [currentList, setCurrentList] = useState([0, 0, 0, 0, 0, 0, 0]); //Lista para ser usada no balanceamento dos dias

  useEffect(() => { //useEffect vai copiar os valores automaticamente quando forem mudados nos inputs para 
    setWeekList([...stateDays]);
    setSubjectList(stateMaterias.map(materia => ({
      name: materia.name,
      hours: parseInt(materia.hours, 10),
    })));
  }, [stateDays, stateMaterias]);





  const handleDayChange = (event, index) => {
    const updatedDays = [...stateDays]; // Faz uma cópia da lista dos dias
    updatedDays[index] = parseInt(event.target.value, 10); // Modifica o valor do dia, transformando para número inteiro, caso não esteja.(O 10 é só para especificar que é um número decimal)
    setStateDays(updatedDays); // Substitui a lista pela atualizada
  };
  const handleMateriaChange = (event, index, attribute) => {
    const updatedMaterias = [...stateMaterias]; // Faz uma cópia da lista de matérias
    updatedMaterias[index][attribute] = event.target.value; // Modifica no atributo(name,hour), já que não é só mudar no index
    setStateMaterias(updatedMaterias); // Substitui a lista pela atualizada
  };




  function addMateria() {
    setStateMaterias([
      ...stateMaterias, { name: "", hours: 0 } //Copia a lista de stateMaterias atual e adiciona uma nova com nome em branco e quantidade de horas zerada
    ])
  }




  function areAllSubjectsValid() {//Função para checar se todas as matérias estão com os campos preenchidos
    return (stateMaterias.every(materia => materia.hours > 0) && stateMaterias.every(materia => materia.name != ""));
  }
  function areThereSubjects() {//Função para checar se existem matérias
    return (stateMaterias.length !== 0);
  }
  function checkHours() {
    const subjectListTotalHours = subjectList.reduce((total, subject) => total + subject.hours, 0);
    const weekTotalHours = weekList.reduce((total, day) => total + day, 0);
    return subjectListTotalHours <= weekTotalHours;
  }




  function functionRandom() {
    for (let i = 0; i == 1;) {
      const updatedWeekList = weekList.map((value, index) => {
        if (value > 0) {
          currentList[index] += 1; // Adiciona 1 na currentList no índice correspondente
          return value - 1; // Diminui 1 da weekList
        } else {
          return value;
        }
      });
      
      setWeekList(updatedWeekList);
      setCurrentList(currentList);



      console.log(weekList);
      console.log(currentList);


      /*
      if(subjectList.reduce((total, subject) => total + subject.hours, 0) == 0){
        i = 1;
      }
      */
    }
  }



  function generateSchedule() {

    if (!areThereSubjects()) {
      alert("Pelo menos uma matéria precisa ser inserida.");
      return;
    }
    if (!areAllSubjectsValid()) {
      alert("Certifique-se de que todos os campos das matérias tenham sido preenchidos.");
      return;
    }
    if (!checkHours()) {
      alert("A quantidade de horas livres semanais são menores que a quantidade de horas pretendidas para as matérias.");
      return;
    }


    functionRandom();
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Domingo</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[0]} onChange={(event) => handleDayChange(event, 0)}></input>
          <label>Segunda</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[1]} onChange={(event) => handleDayChange(event, 1)}></input>
          <label>Terça</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[2]} onChange={(event) => handleDayChange(event, 2)}></input>
          <label>Quarta</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[3]} onChange={(event) => handleDayChange(event, 3)}></input>
          <label>Quinta</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[4]} onChange={(event) => handleDayChange(event, 4)}></input>
          <label>Sexta</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[5]} onChange={(event) => handleDayChange(event, 5)}></input>
          <label>Sábado</label>
          <input type='number' min="0" max="16" className="form-control" value={stateDays[6]} onChange={(event) => handleDayChange(event, 6)}></input>
        </div>
      </form>
      <h3>Matérias que deseja estudar</h3>
      {stateMaterias.map((materia, index) => {//Literalmente mapeia os elementos existentes no array stateMaterias e expõe um campo para cada
        return (
          <div key={index}>
            <input type='text' className="form-control" value={materia.name} onChange={(event) => handleMateriaChange(event, index, 'name')}></input>
            <input type='number' min="0" max="20" className="form-control" value={materia.hours} onChange={(event) => handleMateriaChange(event, index, 'hours')}></input>
          </div>
        )
      })}
      <div className="text-center">{/* Parte que tem os botões, mas isso tá feio ainda */}
        <button type="button" onClick={addMateria} className="btn btn-primary mx-auto">Adicionar matéria</button>
        <br></br>
        <br></br>
        <button type="button" onClick={generateSchedule} className="btn btn-primary mx-auto">Gerar cronograma</button>
      </div>
    </div>
  );
}

export default App;
