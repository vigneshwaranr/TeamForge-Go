# TeamForge-Go

#### Description: A browser extension that enhances CollabNet TeamForge's Jump to ID feature

---

**How to install:**

Chrome: Not yet published!

---

**How to use:**

* Remove the default sites and add your own domain address of your TeamForge instance in the options page.
![options screenshot](https://raw.github.com/vigneshwaranr/TeamForge-Go/master/Chrome/Screenshots/options.png "Screenshot that shows the options page")


* Click the addon icon and enter the object id (for eg. `wiki1705`) and hit Enter to go to that object id.
![wiki screenshot](https://raw.github.com/vigneshwaranr/TeamForge-Go/master/Chrome/Screenshots/wiki.png "Opens the wiki id")

* If it is just an artifact id, just the number part alone is enough. (for eg. `123456` will take you to `artf123456`)
![plain number screenshot](https://raw.github.com/vigneshwaranr/TeamForge-Go/master/Chrome/Screenshots/plain_number.png "Opens artifact id")

* Select a large portion of text in the page and click the addon icon. The text field will display only the valid object ids from the selected text. Hitting Enter will open each object ids in separate tabs.
![selection screenshot](https://raw.github.com/vigneshwaranr/TeamForge-Go/master/Chrome/Screenshots/selection.png "Pick object ids from the selection")

* You can also paste any amount of text from any other application (say, email client) into this text field and hit enter. The addon will find valid object ids if there are any and opens them in separate tabs.
* This addon supports all standard object ids as of CollabNet TeamForge 7.0. You may also add additional id patterns (in regex) in the options page.
