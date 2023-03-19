import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import moment from 'moment/moment';
import HistoryHabit from '../../components/HistoryHabit';
const HISTORY_URL = "/habits/history/daily"

const HistoryPage = (props) => {
  const [value, setValue] = useState(new Date());
  const { percentage } = props
  const { auth } = useAuth()
  const [history, setHistory] = useState([])
  const [greenDates, setGreenDates] = useState([])
  const [pinkDates, setPinkDates] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [showHistoryHabit, setShowHistoryHabit] = useState(false)

  useEffect(() => {

    const getTodayHabits = async () => {
      const newGreenDates = []
      const newPinkDates = []
      try {
        const response = await axios.get(HISTORY_URL, config, {
          signal: controller.signal,
        });
        setHistory(response.data);

        response.data.forEach(data => data.habits.every(habit => habit.done) ? newGreenDates.push(moment(data.day, "DD/MM/YYYY").toDate()) : newPinkDates.push(moment(data.day, "DD/MM/YYYY").toDate()))
        setGreenDates(newGreenDates)
        setPinkDates(newPinkDates)

      } catch (err) {
        console.error(err);
        setHistory([]);
      } 
    };

    let isMounted = true;
    const controller = new AbortController();
    const config = {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    };

    getTodayHabits();


    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // function to add a circular background to the tile
  const addCircleBackground = ({ date, view }) => {
    if (view === 'month') {
      if (greenDates.some((d) => d.getTime() === date.getTime())) {
        return 'react-calendar__tile--green-bg react-calendar__tile--clickable';
      }
      if (pinkDates.some((d) => d.getTime() === date.getTime())) {
        return 'react-calendar__tile--pink-bg react-calendar__tile--clickable';
      }
      if (date.getTime() === new Date().getTime()) {
        return 'react-calendar__tile--today';
      }
    }
    return '';
  }

  const handleClick = date => {
    const data = history.filter(d => d.day === `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`)
    setSelectedDay(data[0])

  }

  useEffect(() => {
    selectedDay !== null && setShowHistoryHabit(true)
  }, [selectedDay])

  return (
    <>
      <Header signedIn={true} />
      <Main data-test="calendar">
        <StyledCalendar
          onChange={setValue}
          value={value}
          locale="pt-BR"
          tileClassName={addCircleBackground}
          onClickDay={(date) =>
            greenDates.some((d) => d.getTime() === date.getTime()) ||
              pinkDates.some((d) => d.getTime() === date.getTime())
              ? handleClick(date)
              : null
          }
        />
        {showHistoryHabit &&
          <HistoryHabit
            selectedDay={selectedDay}
            setShowHistoryHabit={setShowHistoryHabit}
            setSelectedDay={setSelectedDay}
          />
        }
      </Main>
      <Footer percentage={percentage} />
    </>
  );
};

const Main = styled.main`
    background: #E5E5E5;
    height: calc(100vh - 140px);
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledCalendar = styled(Calendar)`
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 335px;
    height: 402px;
    background: #fff;
    font-size: 1rem;
    
    .react-calendar__tile {
        color: #000;
        text-align: center;
    }

    .react-calendar__tile--active {
        background-color: white;
    }
    
    .react-calendar__tile--green-bg {
    background-color: #8CC654;
  }

  .react-calendar__tile--pink-bg {
    background-color: #EA5766;
  }
  .react-calendar__tile--green-bg,
  .react-calendar__tile--pink-bg {
      background-clip: padding-box;
      border-radius: 50%;
      transform: scale(0.8);
  }
  .react-calendar__tile--now,
  .react-calendar__tile--today {
    background-color: yellow;
    border-radius: 0;
    transform: scale(1);
  }

  .react-calendar__month-view__weekdays {
    text-align: left;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #000;
    font-style: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: blue;
  }

  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow {
    color: #000;
  }
  .react-calendar__navigation__label {
    font-size: 0.75rem;
  }

  .react-calendar__navigation__arrow {
    width: 10px;
  }


    .react-calendar__year-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}

.react-calendar__year-view__months__month,
.react-calendar__decade-view__years__year {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 77px;
  color: #000;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  transform: scale(0.8);
}

.react-calendar__year-view__months__month:hover,
.react-calendar__decade-view__years__year {
  background-color: #E5E5E5;
}
`;

export default HistoryPage;