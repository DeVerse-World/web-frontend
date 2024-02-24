import CollapsableQuestion from "./CollapsableQuestion";
import { Button } from "react-bootstrap";

export default function FaqSection() {
  const items = [
    {
      question: "Is Deverse World free?",
      answer: "Yes, Deverse World is completely free to play.",
    },
    {
      question: "What can I do with isles I found?",
      answer:
        "You can claim that isles if you like it. You can also sell, transfer, or just simply explore for rare resources and monsters",
    },
    {
      question: "Does Deverse World have tokens?",
      answer: "No, we currently do not have tokens.",
    },
    {
      question: "Do I have to spend anything to fully enjoy the experience?",
      answer:
        "No, you do not have to spend anything to play or explore the game.",
    },
    {
      question: "Where can I submit the bugs?",
      answer:
        "You can submit the issues or bugs you found in our Discord community.",
    },
  ];

  return (
    <section aria-labelledby="faq-heading">
      <div className="gradient-divider"></div>
      <div
        className="relative  flex flex-col align-items-center mt-8"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-lightest pb-3  flex flex-col align-items-center deverse-title">
          FAQ
        </h2>
        {items.map((item) => (
          <CollapsableQuestion question={item.question} answer={item.answer} />
        ))}
        <Button
          className="action-button mt-3"
          href="https://docs.deverse.world/faq"
          target="_blank"
        >
          <div className="group flex">Learn more &rarr;</div>
        </Button>
      </div>
    </section>
  );
}
