import dynamic from "next/dynamic";



const HelloWord = dynamic(() => import("./helloWord/helloWord"), {
  ssr: false,
});

export default function Base() {
  return (
    <>
      
        <HelloWord />
    
    </>
  );
}
