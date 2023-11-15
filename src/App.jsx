import './App.css';
import { useState, useEffect } from 'react';
import { BemVindoPage } from './pages/BemVindo';

function App() {
  const [stateDays, setStateDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [stateMaterias, setStateMaterias] = useState([]);

  const [weekList, setWeekList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [scheduleList, setScheduleList] = useState([[], [], [], [], [], [], []]);//Lista de cronograma
  const [showSchedule, setShowSchedule] = useState(false);

  const daysName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const [displayedSchedule, setDisplayedSchedule] = useState([]);//Lista de cronograma

  const [currentPage, setCurrentPage] = useState(0);




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
    return (stateMaterias.every(materia => materia.hours > 0) && stateMaterias.every(materia => materia.name !== ""));
  }
  function areThereSubjects() {//Função para checar se existem matérias
    return (stateMaterias.length !== 0);
  }
  function checkHours() {
    const subjectListTotalHours = subjectList.reduce((total, subject) => total + subject.hours, 0);
    const weekTotalHours = weekList.reduce((total, day) => total + day, 0);
    return subjectListTotalHours <= weekTotalHours;
  }


  function resetValues() {
    setStateDays([0, 0, 0, 0, 0, 0, 0]);
    setStateMaterias([]);
    setScheduleList([[], [], [], [], [], [], []]);
  }


  function functionRandom() {
    const unallocatedSubjects = [...subjectList]; // Lista de matérias não alocadas
    while (unallocatedSubjects.length > 0) {

      //Separa os dias com horas disponíveis na semana
      const availableDays = weekList.reduce((available, hours, index) => {//Acumulattor, current value, current index
        if (hours > 0) {
          available.push(index);
        }
        return available;
      }, []);


      if (availableDays.length === 0) {
        break;
      }

      //Sorteia um dia dentre os disponíveis
      const randomDayIndex = Math.floor(Math.random() * availableDays.length);
      const selectedDay = availableDays[randomDayIndex];

      //Sorteia uma matéria aleatória dentre as disponíveis
      const randomSubjectIndex = Math.floor(Math.random() * unallocatedSubjects.length);
      const selectedSubject = unallocatedSubjects[randomSubjectIndex];

      //Insere o nome da matéria no dia correspondente, cada nome inserido equivale a uma hora
      const updatedScheduleList = [...scheduleList];
      updatedScheduleList[selectedDay].push(selectedSubject.name);
      setScheduleList(updatedScheduleList);

      //Diminui em 1 hora a quantidade de horas disponíveis no dia usado e da matéria selecionada
      weekList[selectedDay]--;
      selectedSubject.hours--;

      //Caso a matéria zere a quantidade de horas necessárias, retira a matéria da lista das matérias não alocadas
      if (selectedSubject.hours === 0) {
        unallocatedSubjects.splice(randomSubjectIndex, 1);
      }
    }
    console.log(scheduleList);//log só para checar as atribuições do cronograma

  }


  function removeSubject(index) {
    const updateStateMaterias = [...stateMaterias];
    updateStateMaterias.splice(index, 1);
    setStateMaterias(updateStateMaterias);
  }

  function generateSchedule() {

    //Checa se existe alguma matéria
    if (!areThereSubjects()) {
      alert("Pelo menos uma matéria precisa ser inserida.");
      return;
    }
    //Checa se todas as matérias inseridas são válidas
    if (!areAllSubjectsValid()) {
      alert("Certifique-se de que todos os campos das matérias tenham sido preenchidos.");
      return;
    }
    //Checa se a quantidade de horas na semana é maior ou igual à quantidade de horas que precisa de alocação
    if (!checkHours()) {
      alert("A quantidade de horas livres semanais são menores que a quantidade de horas pretendidas para as matérias.");
      return;
    }

    setDisplayedSchedule(scheduleList); //Essa outra lista serve para ser mostrada no resultado final, para poder zerar a lista principal sem risco de erros
    functionRandom();
    setShowSchedule(true);

    resetValues();
  }

  // página de bem vindo
  if (currentPage === 0) {
    return (
      <BemVindoPage
        pageState={{ currentPage, setCurrentPage }}
      />
    )
  }

  // página padrão
  return (
    <div className="teste">
      {/* GERAR CRONOGRAMA */}
      {!showSchedule && (
        <>
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
                <button type="button" class="btn btn-default btn-number" onClick={() => removeSubject(index)}>-</button>

              </div>
            )
          })}
          <div className="text-center"> {/* Parte que tem os botões, mas isso tá feio ainda */}
            <button type="button" onClick={addMateria} className="btn btn-primary mx-auto">Adicionar matéria</button>
            <br></br>
            <br></br>
            <button type="button" onClick={generateSchedule} className="btn btn-primary mx-auto">Gerar cronograma</button>
          </div>
        </>
      )}

      {/* CRONOGRAMA */}
      {showSchedule && (
        <div>
          <h3>Cronograma Semanal</h3>
          <div className="schedule">
            {daysName.map((day, dayIndex) => (
              <div key={dayIndex}>
                <strong>{day}:</strong>
                {displayedSchedule[dayIndex].length > 0 ? (
                  displayedSchedule[dayIndex].map((subject, subjectIndex) => (
                    <p key={subjectIndex}>{subject}</p>
                  ))
                ) : (
                  <p>Nenhum estudo planejado</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

export default App;
