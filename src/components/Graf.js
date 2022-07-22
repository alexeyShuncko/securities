import React from 'react'
import { ResponsiveLine } from '@nivo/line'




const Graf = (props) => {

    let grafS = new Date('07.01.2022')
    let grafPo = new Date('08.01.2022')


    const DateFunc = (date) => {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.20' + yy;
    }

    const arrDates = (a, b) => {

        let arrTime = []
        for (let i = a; i <= b; new Date(i.setDate(i.getDate() + 1))) {

            const data = DateFunc(new Date(i))
            arrTime.push({ created: data })
        }
        return arrTime
    }

    let timer = arrDates(grafS, grafPo)

const color = [
    '#007FFF', 
    '#61db8a', 
    '#e98085'
]
   



    const data1 = {
        'id': 'Газпром',
        'data': timer.map(t => {
            return {
                'x': t.created,
                'y': props.arr.filter(a => a.name === 'Газпром').filter(b => b.date === t.created).length === 1
                    ? props.arr.filter(a => a.name === 'Газпром').filter(b => b.date === t.created)[0].price
                    : 0
            }
        })

    }
    const data2 = {
        'id': 'Сбербанк',
        'data': timer.map(t => {
            return {
                'x': t.created,
                'y': props.arr.filter(a => a.name === 'Сбербанк').filter(b => b.date === t.created).length === 1
                    ? props.arr.filter(a => a.name === 'Сбербанк').filter(b => b.date === t.created)[0].price
                    : 0
            }
        })

    }
    const data3 = {
        'id': 'Автоваз',
        'data': timer.map(t => {
            return {
                'x': t.created,
                'y': props.arr.filter(a => a.name === 'Автоваз').filter(b => b.date === t.created).length === 1
                    ? props.arr.filter(a => a.name === 'Автоваз').filter(b => b.date === t.created)[0].price
                    : 0
            }
        })

    }

    const data = [data1, data2, data3]



    return (
        <div style={{ height: '500px' }}>
            <ResponsiveLine
                data={data}
                margin={{
                    top: 50,
                    right: 20,
                    bottom: 120,
                    left: 80
                }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 3,
                    tickPadding: 4,
                    tickRotation: -90,
                    legend: 'Дата',
                    legendOffset: 100,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Стоимость',
                    legendOffset: -60,
                    legendPosition: 'middle'
                }}
                 colors={color}
                pointSize={5}
                pointColor="black"
                pointBorderWidth={3}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-18}
                enableCrosshair={true}  // перекрестие на точку поумолчанию true
                crosshairType="cross"
                enableArea={true}
                enableSlices={false} // отображаются данны по всем категориям
                areaBlendMode="darken" // цвет под графиком
                areaOpacity={0.6}    // прозрачность цвета под графиком
                useMesh={true}
                theme={                 // объект добавления свойств диаграммы
                    {
                        "fontSize": 13,
                        // "background": "#ffffff",
                        // "textColor": "#333333",
                        "axis": {               //оси
                           
                            "legend": {
                                "text": {
                                    "fontSize": 18,
                                    "fill": "#000"
                                }
                            },
                          
                        },
                       
                        "legends": {
                     
                            "text": {
                                "fontSize": 16,
                            },
                     
                        },
                       
                    }
                }
              
                legends={[
                    {
                        anchor: 'top',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: -50,
                        itemWidth: 150,
                        itemHeight: 20,
                        itemsSpacing: 4,
                        symbolSize: 20,
                        symbolShape: 'circle',
                        itemDirection: 'left-to-right',
                        itemTextColor: '#000',

                        effects: [
                            {
                                on: 'hover',

                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]
                }
            />
        </div>

    )

}
export default Graf;
