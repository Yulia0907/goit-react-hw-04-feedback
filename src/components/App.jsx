import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification'
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = e => {
    const currentName = e.target.name;
    
    switch (currentName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return
    }
  };

  function totalFeedback() {
    return good + neutral + bad;
  }

  function positivePercentage() {
    let total = totalFeedback();

    if (totalFeedback() === 0) {
      return 0;
    }
    return Math.round(good / total * 100);
  };
  
  return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
           options={Object.keys({good, neutral, bad})}
           onLeaveFeedback={handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback() !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback()}
              positivePercentage={positivePercentage()}
            />
          ) :
            (<Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </div>
    );
  }