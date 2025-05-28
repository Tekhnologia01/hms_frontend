
import CommanButton from "../../components/common/form/commonButtton";

function Notification() {
  return (
    <div className="">
      <div className="fs-5 fw-bold pb-2">Notification Setting</div>
      <div className="fs-5 fw-bold pb-3">Email Settings</div>
      <div className="d-flex">
        <div className="fw-bold " style={{fontSize:'1rem'}}>
          <span className="pe-1">
            {" "}
            <input
              type="checkbox"
              style={{ transform: "scale(1.5)", cursor: "pointer" }}
            />
          </span>{" "}
          I want to receive important notifications and updates via Email
        </div>
      </div>
      <div className="ps-lg-4 pt-1 " style={{fontSize:'1rem'}}>You can Disable these at any time</div>

      <div className="pt-5">
        <CommanButton
          label="Save Change"
          variant="#7B3F0080"
          className="mb-3 ps-4 pe-4  p-2 fw-semibold"
          style={{ borderRadius: "5px" }}
          // onClick={handleFormSubmit}
        />
      </div>
    </div>
  );
}

export default Notification;
