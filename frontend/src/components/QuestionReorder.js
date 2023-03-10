// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Divider } from "@mui/material";
// import React, { useState } from "react";

// function QuestionList({ questions }) {
//   const [draggingQuestionIndex, setDraggingQuestionIndex] = useState(null);

//   function handleDragStart(event, index) {

//     event.dataTransfer.setData('text/plain', index);
//     setDraggingQuestionIndex(index);

//   }

//   function handleDragOver(event, index) {
//     if (index === draggingQuestionIndex) {
//       return;
//     }

//     const newQuestions = [...questions];
//     const draggedQuestion = newQuestions[draggingQuestionIndex];

//     newQuestions.splice(draggingQuestionIndex, 1);
//     newQuestions.splice(index, 0, draggedQuestion);

//     setDraggingQuestionIndex(index);
//     // Update the parent component's state with the new order of questions
//     // This is just an example, you'll need to implement this based on your specific use case
//     // For instance, you might pass a callback function to this component that updates the parent state
//     // with the new order of questions.
//   }

//   function handleDragEnd() {
//     setDraggingQuestionIndex(null);
//   }

//   return (
//     <div>
//       {questions.map((question, index) => (
//         <div
//           key={index}
//           draggable={true}
//           onDragStart={(event) => handleDragStart(event, index)}
//           onDragOver={(event) => handleDragOver(event, index)}
//           onDragEnd={handleDragEnd}
//           style={{
//             backgroundColor: "#FFF",
//             borderRadius: 10,
//             marginBottom: 10,
//           }}
//         >
//           <div
//             className='drag-handle'
//             style={{
//               padding: 10,
//               backgroundColor: "#cccccc",
//               borderTopRightRadius: 10,
//               borderTopLeftRadius: 10,
//             }}
//           >
//             <FontAwesomeIcon icon={faBars} />
//             <span style={{ marginLeft: 10 }}>Question {index + 1}</span>
//           </div>
//           <Divider />
//           <div
//             style={{ padding: 10 }}
//             dangerouslySetInnerHTML={{
//               __html: JSON.parse(question.question).text,
//             }}
//             className='question-text'
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default QuestionList;

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "@mui/material";
function QuestionList({ questions, setQuestions }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);
    setQuestions(newQuestions);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='questions'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      className='drag-handle'
                      style={{
                        padding: 10,
                        backgroundColor: "#cccccc",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                      {...provided.dragHandleProps}
                    >
                      <FontAwesomeIcon icon={faBars} />
                      <span style={{ marginLeft: 10 }}>
                        Question {index + 1}
                      </span>
                    </div>
                    <Divider />
                    <div
                      style={{ padding: 10 }}
                      className='question-text'
                      dangerouslySetInnerHTML={{
                        __html: JSON.parse(question.question).text,
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default QuestionList;
