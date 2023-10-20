import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/ui/table";


function createData(name: string, location: string, location_virt: string, start: string, end: string) {
  return { name, location, location_virt, start, end };
}

export const hackerScheduleData = [
  createData("HACKING", "1819 Innovation Hub", "Discord Server", "Nov 4 - 11:30 AM", "-"),
  createData("Check-In", "First Floor Main Desk", "Discord #verification Channel", "Nov 4 - 09:00 AM", "Nov 4 - 10:30 AM"),
  createData("Sponsor Expo", "Second Floor Common Area", "Discord Sponsor Channels", "Nov 4 - 09:00 AM", "Nov 4 - 10:30 AM"),
  createData("Opening Ceremony", "Room 230", "YouTube Stream", "Nov 4 - 10:30 AM", "Nov 4 - 11:15 AM"),
  createData("Lunch", "Second Floor Common Area", "N/A", "Nov 4 - 11:15 AM", "Nov 4 - 12:00 PM"),
  createData("Hacking Begins", "-", "-", "Nov 4 - 11:15 AM", "Nov 5 - 11:30 AM"),
  createData("Hackathon 101", "Second Floor Common Area", "Teams Meeting", "Nov 4 - 01:00 PM", "Nov 4 - 01:30 PM"),
  createData("Team Formation", "Second Floor Common Area", "Teams Meeting", "Nov 4 - 01:30 PM", "Nov 4 - 02:00 PM"),
  createData("Workshops (see below)","Esports Lab", "Teams Meeting", "Nov 4 - 02:00 PM", "Nov 4 - 05:00 PM"),  
  createData("Dinner", "Second Floor Common Area", "N/A", "Nov 4 - 06:00 PM", "Nov 4 - 06:30 PM"),
  createData("Super Smash Bros Tournament", "Esports Lab", "N/A", "Nov 4 - 07:00 PM", "Nov 4 - 08:00 PM"),
  createData("MLH Bob Ross Contest", "Esports Lab", "Discord #mlh activites Channel", "Nov 4 - 08:00 PM", "Nov 4 - 09:00 PM"),
  createData("Midnight Snack", "Second Floor Common Area", "N/A", "Nov 5 - 12:00 AM", "Nov 5 - 12:30 AM"),
  createData("Board Games/Jackbox Games", "Second Floor Common Area", "Discord #game-room-1-vc Channel", "Nov 5 - 01:00 AM", "Nov 5 - 02:00 PM"),
  createData("Sim Racing", "Second Floor Common Area", "N/A", "Nov 5 - 04:00 AM", "Nov 5 - 05:00 AM"),
  createData("Stretching", "Common Area", "N/A", "Nov 5 - 05:00 AM", "Nov 5 - 05:30 AM"),
  createData("Breakfast", "Second Floor Common Area", "N/A", "Nov 5 - 09:00 AM", "Nov 5 - 10:00 AM"),
  createData("Hacking Ends", "-", "-", "-", "Nov 5 - 11:30 AM"),
  createData("Live Judging", "Assigned Discord Channel", "Assigned Discord Channel", "Nov 5 - 12:00 PM", "Nov 5 - 03:00 PM"),
  createData("Closing Ceremony", "Room 230", "YouTube Stream", "Nov 5 - 05:00 PM", "Nov 5 - 06:00 PM"),
];

export const workshopScheduleData = [
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 02:00 PM", "Nov 4 - 03:00 PM"),
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 03:00 PM", "Nov 4 - 04:00 PM"),
  createData("Workshop", "Esports Lab", "Teams Meeting", "Nov 4 - 04:00 PM", "Nov 4 - 05:00 PM"),
];

export const column = [ 
  {
    name: "Title",
    selector: "title",
    sortable: false,
  },
  {
    name: "In-Person Location",
    selector: "inperson",
    sortable: false,
  },
  {
    name: "Online Location",
    selector: "online",
    sortable: false,
  },
  {
    name: "Start Time",
    selector: "start",
    sortable: true,
  },
  {
    name: "End Time",
    selector: "end",
    sortable: false,
  },
];

<div>
  <Table className="titles" aria-label="simple table">
    <TableHead className="schedule-gray-row">
      <TableRow style={{ backgroundColor: "#191919", textTransform: "uppercase" }}>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Event
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            In-Person Location
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Online Location
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-date-time">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Start Time (EDT)
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-date-time">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            End Time (EDT)
          </span>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {hackerScheduleData.map(row => (
        <TableRow key={row.name}>
          <TableCell align="center" className="schedule-name" scope="row">
            <span className="b" style={{ fontSize: "20px" }}>
              {row.name}
            </span>
          </TableCell>
          <TableCell
            align="center"
            className="schedule-date-time"
            style={{ fontSize: "20px" }}
          >
            {row.start}
          </TableCell>
          <TableCell
            align="center"
            className="schedule-date-time"
            style={{ fontSize: "20px" }}
          >
            {row.end}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  <br></br>
  <h2 className="text-3xl lg:text-5xl title font-semibold mt6">Workshops</h2>
  <Table className="title" aria-label="simple table">
    <TableHead className="schedule-gray-row">
      <TableRow style={{ backgroundColor: "#191919", textTransform: "uppercase" }}>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Workshop
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            In-Person Location
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-name">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Online Location
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-date-time">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            Start Time (EDT)
          </span>
        </TableCell>
        <TableCell align="center" className="schedule-date-time">
          <span className="font-primary b" style={{ fontSize: "20px", color: "#EDEDED" }}>
            End Time (EDT)
          </span>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {workshopScheduleData.map(row => (
        <TableRow key={row.name}>
          <TableCell align="center" className="schedule-name" scope="row">
            <span className="b" style={{ fontSize: "20px" }}>
              {row.name}
            </span>
          </TableCell>
          <TableCell
            align="center"
            className="schedule-date-time"
            style={{ fontSize: "20px" }}
          >
            {row.start}
          </TableCell>
          <TableCell
            align="center"
            className="schedule-date-time"
            style={{ fontSize: "20px" }}
          >
            {row.end}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>;
