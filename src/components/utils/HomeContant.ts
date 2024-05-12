interface Iservice {
  titel?: string;
  description?: string;
  img?: string;
}

interface IFeaturedProject extends Iservice {
  year: number;
  role: string;
}
export const serviceHomeContant: Iservice[] = [
  {
    titel: "Web Developement",
    description:
      "Absolutely, here are three separate messages, each focusing on one aspect of your organization's services: 1. **Web Development:** Explore endless possibilities with our web development expertise at codecafe. We specialize in crafting responsive,dynamic,and feature-rich websites tailored to your unique requirements. From sleek corporate sites to robust e-commerce platforms, we ensure that your online presence stands out and",
    img: "./web-dev-logo.svg",
  },
  {
    titel: "App Developement",
    description:
      "Absolutely, here are three separate messages, each focusing on one aspect of your organization's services: 1. **Web Development:** Explore endless possibilities with our web development expertise at codecafe. We specialize in crafting responsive,dynamic,and feature-rich websites tailored to your unique requirements. From sleek corporate sites to robust e-commerce platforms, we ensure that your online presence stands out and",
    img: "./ui-ux-logo.png",
  },
  {
    titel: " Ui/Ux Developement",
    description:
      "Absolutely, here are three separate messages, each focusing on one aspect of your organization's services: 1. **Web Development:** Explore endless possibilities with our web development expertise at codecafe. We specialize in crafting responsive,dynamic,and feature-rich websites tailored to your unique requirements. From sleek corporate sites to robust e-commerce platforms, we ensure that your online presence stands out and",
    img: "./web-dev-logo.svg",
  },
];

export const FeaturedProjectContant: IFeaturedProject[] = [
  {
    titel: "Promotional landing page for our  favorite show",
    description:
      "Teamed up with a designer to breathe life into a promotional webpage for our beloved show, Adventure Time. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.",
    img: "./0fd7c0f40a96f751eb02bb2c562a3067.jpg",
    year: 2016,
    role: "Front-end Developer",
  },
  {
    titel: "Promotional landing page for our  favorite show",
    description:
      "Teamed up with a designer to breathe life into a promotional webpage for our beloved show, Adventure Time. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.",
    img: "./f149ac2d56f89222c540145006252a48.jpg",
    year: 2016,
    role: "Front-end Developer",
  },
  {
    titel: "Promotional landing page for our  favorite show",
    description:
      "Teamed up with a designer to breathe life into a promotional webpage for our beloved show, Adventure Time. Delivered a fully responsive design with dynamic content capabilities, seamlessly integrating a newsletter feature to keep fans updated with the latest adventures.",
    img: "./95e2f328f36be1ff918cbf9eb4231f1d.jpg",
    year: 2016,
    role: "Front-end Developer",
  },
];
