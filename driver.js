window.addEventListener("message", function(event) {
  const { origin, data: { key, params } } = event;

  window.function(...params)
    .then(function(result) {
      const response = { key };
      if (result !== undefined) {
        // FIXME: Remove `type` once that's in staging
        console.log(result)
        response.result = { value: result };
      }
      event.source.postMessage(response, "*");
    })
    .catch(function(e) {
      let error;
      try {
        error = e.toString();
      } catch (err) {
        error = "Exception can't be stringified.";
      }
      const response = { key, error: error };
      event.source.postMessage(response, "*");
    });
});

/*window.addEventListener("message", async function(event) {
  const { origin, data: { key, params } } = event;

  let result;
  let error;
  try {
    result = await window.function(...params)
  } catch (e) {
    result = undefined;
    try {
      error = e.toString();
    } catch (e) {
      error = "Exception can't be stringified.";
    }
  }

  const response = { key };
  if (result !== undefined) {
    // FIXME: Remove `type` once that's in staging
    response.result = { value: result };
  }
  if (error !== undefined) {
    response.error = error;
  }

  event.source.postMessage(response, "*");
});*/
