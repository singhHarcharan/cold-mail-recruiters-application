import EmailsPreview from "./EmailsPreview";
import InputBoxes from "./InputBoxes";

export default function Dashboard() {
    return (
        <div className="main-page"
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid black",
                width: "100%",
                // background: "#e5e7eb",
            }}>
            <EmailsPreview />
            <InputBoxes />
        </div>
    )
}