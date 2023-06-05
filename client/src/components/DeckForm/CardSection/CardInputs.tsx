import React from 'react';

interface Props {
  subject: string;
  answer: string;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardInputs({
  subject,
  answer,
  setSubject,
  setAnswer,
}: Props) {
  return (
    <>
      <div className='w-full flex flex-col items-center gap-1 sm:gap-0'>
        <label>Front:</label>
        <input
          type='text'
          className='input-field'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className='w-full flex flex-col items-center gap-1 sm:gap-0'>
        <label>Back:</label>
        <input
          type='text'
          className='input-field'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
    </>
  );
}
