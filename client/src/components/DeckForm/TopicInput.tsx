import React from 'react'

interface Props {
    setTopic: React.Dispatch<React.SetStateAction<string>>;
    topic: string
}

export default function TopicInput({topic, setTopic}: Props) {
    console.log('rendering')
  return (
    <div className="w-full flex gap-2 items-center flex-col sm:flex-row">
        <label className="min-w-fit">Topic Name:</label>
        <input type="text" className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)} />
    </div>
  )
}
