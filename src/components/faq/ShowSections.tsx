import React, { useState } from 'react'
import faqQandA from '../../../jsons/faqQandA.json'
import SvgIcon from '../shared/SvgIcon'

interface ShowSectionsProps {
  active: string
}

const ShowSections: React.FC<ShowSectionsProps> = ({ active }) => {
  const updatedQuestions = faqQandA.filter((ques) => ques.section.includes(active))
  const [expand, setExpand] = useState(0)
  return (
    <div className="px-4 py-2">
      {updatedQuestions.map((fq, i) => {
        return (
          <div key={fq.id} onClick={() => setExpand(i)} className="cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl">
                {i + 1}. {fq.question}
              </h3>
              {expand ? <SvgIcon d="M19 9l-7 7-7-7" /> : <SvgIcon d="M5 15l7-7 7 7" />}
            </div>
            {expand === i && (
              <div className="my-2 mx-5">
                <p className="text-lg font-medium my-2">{fq.answer.heading}</p>
                {fq.answer.lines.map((line) => {
                  return (
                    <p key={line} className="font-medium text-sm ml-2">
                      - {line}
                    </p>
                  )
                })}
              </div>
            )}
            {i + 1 !== updatedQuestions.length && <hr className="border-b border-gray-300 my-2" />}
          </div>
        )
      })}
    </div>
  )
}

export default ShowSections
