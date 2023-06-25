import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "@mui/material";

function QuestionList({ questions, setQuestions }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newQuestions = Array.from(questions);
    const [reorderedItem] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedItem);
    setQuestions(newQuestions);
  };

  

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="questions">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? "#f0f0f0" : "" }}
          >
            {questions.map((question, index) => (
              <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging ? "#f5f5f5" : "#ffffff",
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      className="drag-handle"
                      style={{
                        padding: 10,
                        backgroundColor: "#cccccc",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        cursor: "move",
                      }}
                    >
                      <FontAwesomeIcon icon={faBars} />
                      <span style={{ marginLeft: 10 }}>Question {index + 1}</span>
                    </div>
                    <Divider />
                    <div
                      className="question-text"
                      style={{ padding: 10 }}
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

