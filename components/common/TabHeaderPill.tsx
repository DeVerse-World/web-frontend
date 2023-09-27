import { useRouter } from "next/router";
import { Nav, Tab } from "react-bootstrap";

export type TabHeaderPillItems = {
  href: string;
  label: string;
  Icon: any;
  Pane: any;
};

type Props = {
  data: TabHeaderPillItems[];
};

export function TabHeaderPillBar({ data }: Props) {
  const router = useRouter();

  return (
    <Tab.Container defaultActiveKey="0">
      <nav className="-mb-px flex ashh" aria-label="Tabs">
        <Nav
          variant="pills"
          className="bg-deverse-secondary"
          style={{
            justifyContent: "space-between",
            flex: 1,
            margin: "1rem 0rem 2rem 0",
            borderRadius: "40px",
          }}
          defaultActiveKey="0"
        >
          {data.map((item, index) => {
            return (
              <Nav.Item
                key={item.label}
                style={{
                  fontWeight: "600",
                  lineHeight: "60px",
                  minWidth: "150px",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Nav.Link
                  style={{
                    color: "#E3E3E3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  eventKey={index}
                >
                  <item.Icon
                    className="text-white h-3 w-3 sm:h-5 sm:w-5 mr-2"
                    aria-hidden="true"
                  />
                  {item.label}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </nav>
      <Tab.Content>
        {data.map((item, index) => (
          <Tab.Pane key={index} eventKey={index}>
            {item.Pane}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
}
