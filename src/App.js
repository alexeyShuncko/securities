
import React from 'react'
import { Container, Box, Typography, TextField, Button, 
  AppBar, Toolbar, Select, MenuItem, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, Snackbar, Slide } from '@mui/material';
  import MuiAlert from '@mui/material/Alert';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import './App.css';
import Graf from './components/Graf';
import GrafAlternativ from './components/GrafAlternativ';

function App() {

  const [openSnackBar, setOpenSnackBar] = useState(false)

  const [open, setOpen] = useState(false)
  const [ variantGraf, setVariantGraf] = useState(true)
 
  const [value, setValue] = useState(new Date())
  const [nameA, setNameA] = useState('Газпром')

 const [error, setError] = useState(false)

  const [arr, setArr] = useState(
    [
      { date: '01.07.2022', name: 'Газпром', price: 2000, id: 1 },
      { date: '01.07.2022', name: 'Автоваз', price: 2500, id: 2 },
      { date: '20.07.2022', name: 'Сбербанк', price: 10000, id: 3 },
      { date: '10.07.2022', name: 'Газпром', price: 3000, id: 4 },
      { date: '15.07.2022', name: 'Автоваз', price: 2000, id: 5 },
      { date: '15.07.2022', name: 'Сбербанк', price: 8000, id: 6 },
      { date: '19.07.2022', name: 'Автоваз', price: 1500, id: 7 },
      { date: '15.07.2022', name: 'Газпром', price: 4000, id: 8 }
    ]
  )


  const arrName = ['Дата', `Инструмент  (ценная бумага)`, 'Стоимость']
  const stock = {
    names: ['Газпром', 'Автоваз', 'Сбербанк'],
    color: ['#007FFF', '#e98085', '#61db8a']
  }


// Функция преобразования дат
  const DateFunc = (date) => {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.20' + yy;
  }


  // Добавление данных в таблицу через диалоговое окно
  const addToolHandler = () => {

    if (document.getElementById('dateTool').ariaInvalid === 'true') {
      document.getElementById('dateTool').focus()
    }
    else if  (document.getElementById('priceTool').value.length === 0) {
      setError(true)
      document.getElementById('priceTool').focus()

    }
    else {
      document.getElementById('addTableRow').scrollIntoView()
      const name = nameA
      const price = document.getElementById('priceTool').value
      const date = DateFunc(value)
      setArr([...arr, { date: date, name: name, price: price, id: arr.length + 1 }])
      setOpen(false)
      setOpenSnackBar(true)
    }
   
  }


  // Диалоговое окно обработчики открытия и закрытия
  const editTable = () => {
    setOpen(true)
  } 
  const handleClose = () => {
    setOpen(false)
  }


// Изменение стоимости в таблице
  const priceHandleChange = (e) => {
    arr.find(a => a.id === Number(e.target.parentNode.parentNode.parentNode.id)).price = e.target.value
    setArr(
      [...arr]
    )
  }

  // Отключение в календаре дат, которые уже имеются в таблице 
  const disDay = (date) => {
    let arrDisDay = arr.filter(a=> a.name === nameA).map(a=> Number(a.date.slice(0,2)))
      return arrDisDay.includes(date.getDate())
  }


  // Всплывающее сообщение о сохранении данных в таблице
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  function Transition(props) {
    return <Slide {...props} direction="right" />;
  }
  const handleCloseSnackBar =(e, reason)=> {
    if (reason === 'clickaway') {
        return;
      }
    setOpenSnackBar(false)
}



  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Ценные бумаги
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'lg'} sx={{ mb: 10 }}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          <table>
            <thead>
              <tr >
                {
                  arrName.map(a => {
                    return (
                      <th key={a} ><Typography variant='h6' >{a}</Typography> </th>
                    )
                  })
                }
              </tr>
            </thead>

            <tbody id='tableBody'>
              {
                arr
                .sort((a,b)=> Number(a.date.slice(0,2))-Number(b.date.slice(0,2)))
                .map((a, index) => {
                  return (
                    <tr key={index}
                    // Возможность сделать строки таблицы в цвет ценных бумаг идентичных графику
                    // style={{background: `${stock.color[stock.names.indexOf(a.name)]}`}} 
                    >
                      <td><Typography>{a.date}</Typography></td>
                      <td ><Typography>{a.name}</Typography></td>
                      <td id={a.id}><TextField sx={{ width: '100%' }}
                        size='small'
                        type='number'
                        value={a.price}
                        onBlur={()=> setValue(new Date())}
                        onChange={priceHandleChange}></TextField></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Button id={'addTableRow'} variant='contained' sx={{ my: 2 }} onClick={editTable}>
            Добавить инструмент
          </Button>
        </Box>
        <Box sx={{ mt: 5 }}>
          {
            variantGraf
            ?<>
            <Button variant='outlined' onClick={()=> setVariantGraf(false)}>Второй вариант графика</Button>
            <GrafAlternativ arr={arr} stock={stock}/>
            </>
            :<>
             <Button  variant='outlined' onClick={()=> setVariantGraf(true)}>Первый вариант графика</Button>
             <Graf arr={arr} stock={stock}/>
            </>
          }
         
        </Box>
      </Container>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить инструмент.</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <DialogContentText>
            Заполните все поля.
          </DialogContentText>

          <Select
          onChange={(e)=> setNameA(e.target.value)}
            id='nameTool'
            size='small'
            sx={{ width: '100%', mb: 2 }}
            value={nameA}>
            {
             stock.names.map(a => (
                <MenuItem value={a} key={a}>{a}</MenuItem>
              ))
            }
          </Select>
          <DesktopDatePicker
            minDate={new Date('07.01.2022')}
            shouldDisableDate={disDay}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            disableFuture
            inputFormat="dd.MM.yyyy"
            renderInput={(params) =>
              <TextField
              id='dateTool'
                size='small'
                sx={{ width: '100%', mb: 2 }} {...params} />}
          />
          <TextField
          onChange={()=> setError(false)}
          error={error}
            id='priceTool'
            size='small'
            sx={{ width: '100%' }}
            type='number'>
          </TextField>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='warning'>Выйти</Button>
          <Button 
          onClick={addToolHandler} 
          variant='contained' 
          color='success'>Добавить</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackBar} 
            autoHideDuration={2000} 
            onClose={handleCloseSnackBar}
            TransitionComponent={Transition}
            >
                <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: {md:'100%', xs: '50%'} }}>
                Данные сохранены!
                </Alert>
            </Snackbar>
    </>
  );
}

export default App;
