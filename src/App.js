import './App.css';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';


const data1 = [
  {id: 1, name: 'Draggable 1'},
  {id: 2, name: 'Draggable 2'},
  {id: 3, name: 'Draggable 3'},
  {id: 4, name: 'Draggable 4'},
  {id: 5, name: 'Draggable 5'},
  {id: 6, name: 'Draggable 6'},
]

const data2 = [
  {id: 7, name: 'Draggable 7'},
  {id: 8, name: 'Draggable 8'},
  {id: 9, name: 'Draggable 9'},
  {id: 10, name: 'Draggable 10'},
  {id: 11, name: 'Draggable 11'},
  {id: 12, name: 'Draggable 12'},
  {id: 13, name: 'Draggable 13'},
  {id: 14, name: 'Draggable 14'},
  {id: 15, name: 'Draggable 15'},
]

function App() {
  const [pendingData, setPendingData] = useState(data1)
  const [completedData, setCompletedData] = useState(data2);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    const [reOrderedData] = pendingData.splice(source.index, 1);
    pendingData.splice(destination.index, 0, reOrderedData)

    setPendingData(pendingData)
  }



  return (
    <div className="App">
      <h1 className='text-3xl'>List of Items</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex justify-evenly mt-8'>

          <Droppable droppableId='pendingDataList'>
            {(provided, snapshot) => (
              <div
                className={`bg-red-400 p-4 w-[300px] ${snapshot.isDraggingOver ? 'bg-red-600' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  pendingData.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          className={`py-4 mb-2 bg-blue-300 border ${snapshot.draggingOver ? 'bg-blue-500' : ''}`}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={item.id}
                          >
                          {item.name}
                        </div>
                      )}
                    </Draggable>
                  ))
                }
              {provided.placeholder}
              </div>
            )}

          </Droppable>



          {/* <Droppable>
            {(provided) => (
            <div 
              className='bg-red-400 p-4 w-[300px]' 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <Draggable draggableId='1' index={1}> 
                {(provided) => (
                  <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='py-4 mb-2 bg-blue-300 border'
                  >
                    Draggable 1
                  </div>
                )}
              </Draggable>
              <Draggable draggableId='2' index={2}>
                {(provided) => (
                  <div 
                    className='py-4 mb-2 bg-blue-300 border'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Draggable 2
                  </div>
                )}
              </Draggable>
              <div className='py-4 mb-2 bg-blue-300 border'>Draggable 3</div>
              <div className='py-4 mb-2 bg-blue-300 border'>Draggable 4</div>
              <div className='py-4 mb-2 bg-blue-300 border'>Draggable 5</div>
            </div>
            )}
          </Droppable>

          <Droppable droppableId='column2'>
            {(provided) => (
              <div 
                className='bg-green-500 w-[300px] p-4'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className='py-4 mb-2 bg-blue-300 border'>Draggable 6</div>
                <div className='py-4 mb-2 bg-blue-300 border'>Draggable 7</div>
                <div className='py-4 mb-2 bg-blue-300 border'>Draggable 8</div>
                <div className='py-4 mb-2 bg-blue-300 border'>Draggable 9</div>
                <div className='py-4 mb-2 bg-blue-300 border'>Draggable 10</div>
              </div>
            )}
          </Droppable> */}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App; 