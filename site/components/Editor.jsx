import React, {useContext} from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";

import EditorContext from "../utils/EditorContext";

const data = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Content1' },
        'task-2': { id: 'task-2', content: 'Content2' },
        'task-3': { id: 'task-3', content: 'Content3' },
        'task-4': { id: 'task-4', content: 'Content4' },
        'task-5': { id: 'task-5', content: 'Content5' },
        'task-6': { id: 'task-6', content: 'Content6' }
    },
    columns: {
        'col-1': {
            id: 'col-1',
            title: 'Header',
            taskIds: ['task-1','task-2']
        },
        'col-2': {
            id: 'col-2',
            title: 'Nav',
            taskIds: ['task-3']
        },
        'col-3': {
            id: 'col-3',
            title: 'Main',
            taskIds: ['task-4','task-5']
        },
        'col-4': {
            id: 'col-4',
            title: 'Footer',
            taskIds: ['task-6']
        }
    },
    columnOrder: ['col-1','col-2','col-3']
};

class Task extends React.Component {
    render() {
        const isDragDisabled = false;
        return (
            <Draggable
                className="block"
                draggableId={this.props.task.id}
                index={this.props.index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <div className={snapshot.isDragging?'text-success block':isDragDisabled?'text-black block':'text-danger block'}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {this.props.task.content}
                    </div>
                )}
            </Draggable>
        );
    }
}

class Column extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.column.title}</h4>
                <Droppable
                    droppableId={this.props.column.id}
                    //type={this.props.column.id === 'col-3' ? 'done' : 'active' }
                    isDropDisabled={this.props.isDropDisabled}
                >
                    {(provided, snapshot) => (
                        <div className={snapshot.isDraggingOver?'bg-info':''}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task,index) => <Task key={task.id} task={task} index={index} />)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

class EditorCore extends React.Component {
    state = data;

    onDragStart = start => {
        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
        this.setState({
            homeIndex
        });
    };

    onDragUpdate = result => {
        console.log('dragupdate');
    };

    onDragEnd = result => {

        this.setState({
            homeIndex: null
        });

        const { destination, source, draggableId } = result;

        if ( !destination ) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        console.log(source);

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if ( start === finish ) {

            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState(newState);

            return;

        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);

        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        this.setState(newState);

    };
    render() {
        resetServerContext();
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <div className="wrapper">
                    <header className="main-head">
                        <Column column={data.columns['col-1']} tasks={data.columns['col-1'].taskIds.map(taskId => this.state.tasks[taskId])} isDropDisabled={false} />
                    </header>
                    <nav className="main-nav">
                        <Column column={data.columns['col-2']} tasks={data.columns['col-2'].taskIds.map(taskId => this.state.tasks[taskId])} isDropDisabled={false} />
                    </nav>
                    <article className="content">
                        <Column column={data.columns['col-3']} tasks={data.columns['col-3'].taskIds.map(taskId => this.state.tasks[taskId])} isDropDisabled={false} />
                    </article>
                    <aside className="side">Sidebar</aside>
                    <div className="ad">Advertising</div>
                    <footer className="main-footer">
                        <Column column={data.columns['col-4']} tasks={data.columns['col-4'].taskIds.map(taskId => this.state.tasks[taskId])} isDropDisabled={false} />
                    </footer>
                </div>


            </DragDropContext>

        )
    }
}

export default () => {
    const { mode } = useContext(EditorContext);
    return (
        <React.Fragment>
            <h1>Mode: {mode}</h1>
            <EditorCore/>
        </React.Fragment>
    );
};

// {this.state.columnOrder.map((columnId, index) => {
//     const column = this.state.columns[columnId];
//     const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
//     const isDropDisabled = index < this.state.homeIndex;
//     return (
//         <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />
//     );
// })}
// Left Off At Lesson 10 -> https://egghead.io/lessons/react-conditionally-allow-movement-using-react-beautiful-dnd-draggable-and-droppable-props

