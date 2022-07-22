
import { useState } from 'react';
import { useEffect } from 'react';
import s from './Table.module.css';

const Table =()=> {
  const arr = [
    {
      number: '#1', name: 'Система управления базами данных «Ред База Данных»', kod: '02.09',
      class: 'Системы управления базами данных', date: '29.01.2016', adress: 'Ссылка', кеу: '1'
    },
    {
      number: '#2', name: '1С:Школа. Информатика, 11 класс»', kod: '04.11',
      class: 'Системы управления процессами организации', date: '29.01.2016', adress: 'Ссылка', кеу: '2'
    },
    {
      number: '#3', name: '1С:Школа. Русский язык, 5–6 класс. Лексикология»', kod: '04.11',
      class: 'Информационные системы для решения специфических отраслевых задач',
      date: '29.01.2016', adress: 'Ссылка', кеу: '3'
    },
    {
      number: '#4', name: '1С:Комплексная автоматизация 8»', kod: '04.11',
      class: 'Системы управления процессами организации', date: '20.02.2016', adress: 'Ссылка', кеу: '4'
    },
    {
      number: '#5', name: 'Электронный периодический справочник "Система ГАРАНТ"', kod: '04.15',
      class: 'Прикладное программное обеспечение общего назначения', date: '20.02.2016',
      adress: 'Ссылка', кеу: '5'
    },
    {
      number: '#6',
      name: 'Система электронного документооборота и автоматизации бизнес-процессов «Е1 Евфрат»',
      kod: '04.13',
      class: 'Системы сбора, хранения, обработки, анализа, моделирования и визуализации массивов данных',
      date: '11.03.2016', adress: 'Ссылка', кеу: '6'
    },
    {
      number: '#7', name: 'ABBYY Lingvo', kod: '04.07',
      class: 'Лингвистическое программное обеспечение', date: '11.03.2016', adress: 'Ссылка', кеу: '7'
    },
    {
      number: '#8', name: '1С-Битрикс24 (Компания)', kod: '04.03',
      class: 'Офисные приложения', date: '14.03.2016', adress: 'Ссылка', кеу: '8'
    },
    {
      number: '#9', name: '1С-Битрикс24 (Проект+)', kod: '04.03',
      class: 'Системы управления проектами, исследованиями, разработкой, проектированием и внедрением',
      date: '14.03.2016', adress: 'Ссылка', кеу: '9'
    },
    {
      number: '#10', name: '1С-Битрикс24 (Команда)', kod: '04.03',
      class: 'Системы сбора, хранения, обработки, анализа, моделирования и визуализации массивов данных',
      date: '14.03.2016', adress: 'Ссылка', кеу: '10'
    },
    {
      number: '#11', name: 'Система управления базами данных «Ред База Данных»', kod: '02.09',
      class: 'Системы управления базами данных', date: '29.01.2016', adress: 'Ссылка', кеу: '11'
    },
  ]
  const arrName = [
    'Регистрационный номер',
    'Наименование програмного обеспечения',
    'Код класса',
  ]

  let data = []
  const [edit, setEdit] = useState(true)
  const [activ, setActiv] = useState(0)
  const [editLeft, setEditLeft] = useState(false)
  const [notesOnPage, setNotesOnPage] = useState(2)


  let count = Math.ceil(arr.length / notesOnPage)


  for (let i = 1; i <= count; i++) {

    data.push([...arr.slice((i * notesOnPage - notesOnPage), i * notesOnPage)])
  }



  useEffect(() => {
    let list = document.getElementById('pagin')
    list.innerHTML = ''

    for (let i = 1; i <= count; i++) {
      let li = document.createElement('li')
      li.innerText = i
      li.classList.add(s.menu__item)

      li.addEventListener('click', (e) => {
        setActiv(e.target.innerHTML - 1)
      })
      list.append(li)
    }


    for (let j = 0; j < list.childNodes.length; j++) {
      if (j !== activ) {
        list.childNodes[j].classList.remove(s.activ)
      }
      else {
        list.childNodes[j].classList.add(s.activ)
      }
    }
    if (activ !== count - 1) {
      setEdit(true)
    }
    if (activ === count - 1) {
      setEdit(false)
    }
    if (activ === 0) {
      setEditLeft(false)
    }
    if (activ !== 0) {
      setEditLeft(true)
    }
  }, [setEdit, activ, count])


  const next = () => {
    setActiv(prevActiv => prevActiv + 1)
  }
  const prev = () => {
    setActiv(prevActiv => prevActiv - 1)
  }



  const addClass = (e) => {
    e.target.classList.add(s.activeInput)
  }
  const removeClass = (e) => {
    e.target.classList.remove(s.activeInput)
  }

  const addNumber = () => {
    setNotesOnPage(document.getElementsByTagName('input')[0].value)
    setActiv(0)
  }


  return (
    <div className={s.App}>
      <table>
        <thead>
          <tr >
            {
              arrName.map((a, index) => {
                return (
                  <th key={index}><div>{a}</div> </th>
                )
              })
            }
          </tr>
        </thead>

        <tbody id='tableBody'>

          {
            data[activ].map((a, index) => {
              if (index <= notesOnPage - 1) {
                return (
                  <tr key={a.number}>
                   
                    <td><input defaultValue={a.number}></input></td>
                    <td>{a.kod}</td>
                    <td>{a.class}</td>
                   
                  </tr>
                )
              }


            })
          }
        </tbody>
      </table>

      <div className={s.pagination}>
        {editLeft
          ? <span onClick={prev} style={{ display: 'flex' }}>
             <div style={{ marginBottom: '2px', transform: 'rotate(180deg)' }}>
              <div className={s.arrow}></div>
              <div className={s.arrow2}></div>
            </div>
            prev
          </span>
          : null
        }
        <ul id='pagin'>
        </ul>
        {edit
          ? <span onClick={next} style={{ display: 'flex' }}>
            next
            <div style={{ marginTop: '5px' }}>
              <div className={s.arrow}></div>
              <div className={s.arrow2}></div>
            </div>

          </span>
          : null
        }

      </div>
      <div style={{display: 'flex', }}> 
        Записей на одной странице таблицы:
        <input type={'number'} min={1} max={10}
          onClick={addClass}
          onBlur={removeClass}
          defaultValue={notesOnPage}></input>
        <button onClick={addNumber}>Применить</button>
      </div>
    </div>

  );
}

export default Table;
