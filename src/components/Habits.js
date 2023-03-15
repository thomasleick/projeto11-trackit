import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment } from 'react-loader-spinner';
import Habit from './Habit';

const Habits = (props) => {
  const { habits, getHabits, isLoading, setIsLoading } = props;
  const [fetchError, setFetchError] = useState(null);

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      await getHabits();
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <StatusMsg>
          <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#52B6FF"
          />
        </StatusMsg>
      )}
      {!isLoading && fetchError && (
        <StatusMsg>
          <p style={{ color: 'red' }}>{fetchError}</p>
        </StatusMsg>
      )}
      {!isLoading && !fetchError && (
        <>
          {habits?.length ? (
            habits.map((habit) => (
              <Habit key={habit.id} habit={habit} fetchHabits={fetchHabits} />
            ))
          ) : (
            <StatusMsg>
              <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </p>
            </StatusMsg>
          )}
        </>
      )}
    </>
  );
};

const StatusMsg = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  color: #666666;
  padding: 28px 17px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 700;
  }
`;

export default Habits;