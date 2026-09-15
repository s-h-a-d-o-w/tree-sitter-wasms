type GreetingProps = {
  name: string;
  exclaim?: boolean;
};

export function Greeting({ exclaim = false, name }: GreetingProps) {
  return (
    <section className="greeting">
      <h1>
        Hello, {name}
        {exclaim ? "!" : "."}
      </h1>
    </section>
  );
}

export const App = () => <Greeting exclaim name="world" />;
