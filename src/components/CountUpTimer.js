import React, { useEffect, useState } from 'react';

export function CountUpTimer({ startDate }) {

    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        var date1 = new Date(startDate);
        const timer = setTimeout(() => {
            var date2 = new Date();
            // Берем разницу дат в секундах
            let delta = Math.floor((date2 - date1) / 1000)
            // Вычисляем количество ПОЛНЫХ дней
            let days = Math.floor(delta / 86400);
            // А теперь вычитаем из секунд количество дней, выраженных в секундах
            delta -= days * 86400;
            // В оставшихся секунд вычленяем количество полных часов
            let hours = Math.floor(delta / 3600) % 24;
            // Также их потом вычитаем, выразив в секундах
            delta -= hours * 3600;
            // Из оставшихся секунд берем минуты
            let minutes = Math.floor(delta / 60) % 60;
            // Опять вычитаем
            delta -= minutes * 60;
            // И наконец секунды
            // В теории  деление по модулю на 60 не обязателен
            let seconds = delta % 60;

            setTimer({
                days,
                hours,
                minutes,
                seconds
            })
        }, 1000)
        return () => clearTimeout(timer)
    }, [timer])

    return startDate != null ? (
        <div className='body_card'>
            <div className='header_card'>
                miner is working
            </div>
            <div className='content_card'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='wrap_timerup'>
                        <span>{timer?.days}
                            <span>days</span>
                        </span>

                        <span>{String(timer?.hours).length === 1 ? `0` + timer?.hours : timer?.hours}
                            <span>hours</span>
                        </span>

                        <span>{String(timer?.minutes).length === 1 ? `0` + timer?.minutes : timer?.minutes}
                            <span>minutes</span>
                        </span>

                        <span className='seconds'>{String(timer?.seconds).length === 1 ? `0` + timer?.seconds : timer?.seconds}
                            <span>seconds</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
};
