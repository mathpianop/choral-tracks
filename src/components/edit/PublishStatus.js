import { useEffect } from "react"

export default function PublishStatus({
  publishResponse, publishing, setPublishResponse
}) {

  
  
  const responseMessage = function() {
    if (publishResponse.publish) {
      return <span>Published!</span>
    } else {
      return <span>Unpublished!</span>
    }
  }

  const publishingMessage = function() {
    return <span><i>Wait a moment</i></span>
  }
  
  const content = function() {
    if (publishResponse) {
      return responseMessage()
    } else if (publishing) {
      return publishingMessage()
    } else {
      return "";
    }
  }

  useEffect(() => {
    //clear publish response after 3 seconds
    let timeoutId;
    if (publishResponse) {
      timeoutId = setTimeout(() => {
        setPublishResponse();
      }, 3000)
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [publishResponse])

  return <div className="PublishStatus">{content()}</div>
}