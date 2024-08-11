export async function getter(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple/findAll") {
      const data = await model.find();
      if (!data)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }

    if (rule === "simple/findOne") {
      const data = await model.findById(id);
      if (!data)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
  }
}

export async function poster(req, res, rule, model, mess) {
  try {
    if (rule === "simple") {
      const data = await model.create(req.body);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    return res
      .status(500)
      .send(`${error.message} function=${mess}, rule=${rule}`);
  }
}

export async function patcher(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple") {
      const data = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) return res.status(404).send(mess + " not found");
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    return res
      .status(500)
      .send(`${error.message} function=${mess}, rule=${rule}`);
  }
}
