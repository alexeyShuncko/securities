
import { Container, Box, Typography, TextField, Button, AppBar, Toolbar, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import './App.css';
import Graf from './components/Graf';

function App() {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('07.01.2022')
  const [arr, setArr] = useState(
    [
      { date: '01.07.2022', name: 'Газпром', price: 2000, id: 1 },
      { date: '01.07.2022', name: 'Автоваз', price: 2500, id: 2 },
      { date: '05.07.2022', name: 'Сбербанк', price: 10000, id: 3 },
      { date: '10.07.2022', name: 'Газпром', price: 2500, id: 4 },
      { date: '15.07.2022', name: 'Автоваз', price: 2100, id: 5 },
      { date: '15.07.2022', name: 'Сбербанк', price: 11000, id: 6 }
    ]
  )

  const arrName = ['Дата', 'Инструмент (ценная бумага)', 'Стоимость']
  const names = ['Газпром', 'Автоваз', 'Сбербанк']

  console.log(arr);


  const addToolHandler = () => {
    const DateFunc = (date) => {

      let dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;

      return dd + '.' + mm + '.20' + yy;
  }
    const name = document.getElementById('nameTool').innerHTML
    const price = document.getElementById('priceTool').value
    const date = DateFunc(value)
    setArr([...arr, {date: date, name: name, price: price, id: arr.length +1}])
    setOpen(false)
  }


  // Диалоговое окно обработчики
  const editTable = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }



  const priceHandleChange = (e) => {
    arr.find(a => a.id === Number(e.target.parentNode.parentNode.parentNode.id)).price = e.target.value
    setArr(
      [...arr]
    )
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
      <Container maxWidth={'lg'} sx={{mb: 10}}>

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
                arr.map((a, index) => {
                  return (
                    <tr key={index}>
                      <td><Typography>{a.date}</Typography></td>
                      <td><Typography>{a.name}</Typography></td>
                      <td id={a.id}><TextField sx={{ width: '100%' }}
                       size='small'
                        type='number'
                        value={a.price}
                        onChange={priceHandleChange}></TextField></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Button variant='contained' sx={{ my: 2 }} onClick={editTable}>
            Добавить инструмент
          </Button>
        </Box>
        <Box sx={{mt: 5}}>
         <Graf arr={arr}/> 
        </Box>
      </Container>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить инструмент.</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <DialogContentText>
            Заполните все поля.
          </DialogContentText>
          <DesktopDatePicker
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
          <Select
          id='nameTool'
           size='small'
            sx={{ width: '100%', mb: 2 }}
            defaultValue={'Газпром'}>
            {
              names.map(a => (
                <MenuItem value={a} key={a}>{a}</MenuItem>
              ))
            }
          </Select>
          <TextField 
          id='priceTool'
          size='small'
          sx={{ width: '100%' }}
          type='number'>
          </TextField>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='warning'>Выйти</Button>
          <Button onClick={addToolHandler} variant='contained' color='success'>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>



  );
}

export default App;
