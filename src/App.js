
import { Container, Box, Typography, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import './App.css';

function App() {

  const arr = [
    { date: '01.01.2019', name: 'Газпром', price: 2000, id: 1 },
    { date: '01.01.2019', name: 'Автоваз', price: 2500, id: 2 },
    { date: '05.01.2019', name: 'Сбербанк', price: 10000, id: 3 },
    { date: '10.01.2019', name: 'Газпром', price: 2500, id: 4 },
    { date: '07.10.2019', name: 'Автоваз', price: 2100, id: 5 },
  ]

  const arrName = ['Дата', 'Инструмент (ценная бумага)', 'Стоимость']



  const handleChange = () => {

  }
  return (
    <Container sx={{ mx: 6, my: 3 }}>
      <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
        Ценные бумаги
      </Typography>
      <Box width={'100%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <table>
          <thead>
            <tr >
              {
                arrName.map(a => {
                  return (
                    <th key={a}><Typography variant='h6' >{a}</Typography> </th>
                  )
                })
              }
            </tr>
          </thead>

          <tbody id='tableBody'>

            {
              arr.map((a, index) => {

                return (
                  <tr key={a.id}>
                    <td>   <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={a.date}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    /></td>
                    <td><TextField variant='standard' sx={{ width: '100%' }} defaultValue={a.name}></TextField></td>
                    <td><TextField variant='standard' sx={{ width: '100%' }} defaultValue={a.price}></TextField></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </Box>
      <Box>
        График
      </Box>
    </Container>


  );
}

export default App;
