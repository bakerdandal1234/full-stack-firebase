import { useDocument } from "react-firebase-hooks/firestore";
import { doc,updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import { useState } from "react";
import { arrayUnion } from "firebase/firestore";

const SubTasksSection = ({
  user,
  stringId,
  completedCheckbox,
  trashIcon,
  addMoreBTN,
}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showNewTask, setshowNewTask] = useState(false);
  const [NewInput, setNewInput] = useState("");
  if (value) {
    // console.log(value.data().completed);
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            Created: <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={async (eo) => {
                completedCheckbox(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">Completed </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
        {showNewTask && (
          <form style={{flexDirection:"row"}} className="add-new-task flex">
            <input
              value={NewInput}
              onChange={(eo) => {
                setNewInput(eo.target.value);
              }}
              className="add-task"
              type="text"
            />
            <button
              onClick={ async (eo) => {
                eo.preventDefault()
                setNewInput("")
                await updateDoc(doc(db, user.uid, stringId), {
                  details: arrayUnion(NewInput),
                });
              }}
              className="add"
            >
              Add
            </button>
            <button
              onClick={(eo) => {
                eo.preventDefault()
                setshowNewTask(false);
              }}
              className="cancel"
            >
              cancel
            </button>
          </form>
        )}
        <div className="center mtt">
          <button
            onClick={() => {
              setshowNewTask(true);
            }}
            className="add-more-btn "
          >
            Add more <i className="fa-solid fa-plus"></i>
          </button></div>
        
        
      </section>
    );
  }
};

export default SubTasksSection;
