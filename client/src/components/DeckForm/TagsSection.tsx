import React from 'react'

import TagsSelect from './TagsSelect'

interface Props {
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export default function TagsSection({tags, setTags}: Props) {
  return (
    <div className="w-full">
        <h3 className="my-2 py-0.5 overflow-x-scroll whitespace-nowrap">Tags: 
        {tags.map(tag => <span key={tag} className="me-1 border border-semiLightPurple rounded-md text-tiny p-0.5">{tag}</span>)}
        </h3>
        <TagsSelect tags={tags} setTags={setTags} />
    </div>
  )
}
