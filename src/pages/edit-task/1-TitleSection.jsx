
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { Link } from "react-router-dom";
const TitleSection = ({ user, stringId,titleInput }) => {
  const [value] = useDocument(doc(db, user.uid, stringId));

if (value) {
  console.log(value.data());
}

if (value) {
  return (
    <section className="title center">
      <h1>
        <input
        style={{textDecoration:value.data().completed ?"line-through wavy #454545":""}}
         onChange={ async (eo) => {    // update data in firestore
        titleInput(eo)
        }}
          defaultValue={value.data().title}
          className="title-input center"
          type="text"
        />
        <i className="fa-regular fa-pen-to-square"></i>
        <Link className="link" to={"/"}>go to home page</Link>
      </h1>
    
    </section>
  );
}
};

export default TitleSection;
