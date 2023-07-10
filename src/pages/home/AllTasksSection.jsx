import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";

const AllTasksSection = ({ user }) => {
  const [initialeData, setinitialeData] = useState(
    query(collection(db, user.uid), orderBy("id"))
  );
  // const [completed, setcompleted] = useState(query(collection(db, user.uid), where("completed", "==", true)))

  const [value, loading, error] = useCollection(initialeData);
  // @ts-ignore
  const [Opacity, setOpacity] = useState(false);
  const [selectValue, setselectValue] = useState("ddddd");
  if (error) {
    return <h1>ERROR</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }

  if (value) {
    console.log(value.docs.length);

    return (
      <>
        <section className="parent-of-btns flex mtt">
          {selectValue === "ddddd" && (
            <div>
              <button
                // @ts-ignore
                style={{ opacity: Opacity ? "1" : "0.3" }}
                onClick={() => {
                  setOpacity(true);
                  setinitialeData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                Newest first
              </button>

              <button
                style={{ opacity: Opacity ? "0.3" : "1" }}
                onClick={() => {
                  setOpacity(false);
                  setinitialeData(
                    query(collection(db, user.uid), orderBy("id"))
                  );
                }}
              >
                Oldest first
              </button>
            </div>
          )}
          <select
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "ddddd") {
                setOpacity(false);
                setselectValue("ddddd");
                setinitialeData(query(collection(db, user.uid), orderBy("id")));
              }
              if (eo.target.value === "aaa") {
                setselectValue("aaa");
                setinitialeData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                  )
                );
              }
              if (eo.target.value === "ccc") {
                setselectValue("ccc");
                setinitialeData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
              }
            }}
            id="browsers"
          >
            <option value="ddddd"> All Tasks </option>
            <option value="aaa"> Completed </option>
            <option value="ccc"> Not Completed </option>
          </select>
        </section>
        <section className="flex all-tasks mt">
          {value.docs.length === 0 && <h1>you completed all the task</h1>}
          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
};

export default AllTasksSection;
