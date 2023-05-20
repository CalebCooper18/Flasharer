import { AllTags } from "../../utils/constants";

interface Props {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export default function TagsSelect({tags, setTags}: Props) {

    function handleClick(tag: string)
    {
        const optionSelected = tag
        if(tags.includes(optionSelected))
        {
            setTags(tags.filter(option => option !== optionSelected))
        }
        else 
        {
            setTags(prev => [...prev, optionSelected])
        }
    }
  return (
    <div className="w-full border-b-2 border-solid border-white overflow-y-scroll max-h-16">
        {AllTags.map(tag =>(
            <button className={`text-left w-full hover:cursor-pointer hover:bg-semiLightPurple 
            ${tags.includes(tag) ? 'bg-semiLightPurple': ''}`} 
            type="button" key={tag} onClick={() => handleClick(tag)}>{tag}</button>
        ))}
    </div>
  )
}
