import Icon from "@/assets/images/icon.png"

export function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="my-4">ToolKit</h1>
      <p className="my-4">
        TooKit is a cross-platform, multifunctional toolset software.
      </p>
      <p className="m-auto">
        <img src={Icon} height="200px" width="200px"></img>
      </p>
    </div>
  );
}
