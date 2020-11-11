

export default (N) =>{
  let marker1 = {
    content: '<div style="cursor:pointer;width:26px;height:26px;line-height:26px;font-size:10px;color:white;background-color:#91CD2B;border-radius:50%;text-align:center;font-weight:bold;"></div>',
    size: N.Size(40, 40),
    anchor: N.Point(20, 20)
  };
  let marker2 = {
    content: '<div style="cursor:pointer;width:30px;height:30px;line-height:30px;font-size:10px;color:white;background-color:#71B429;border-radius:50%;text-align:center;font-weight:bold;"></div>',
    size: N.Size(40, 40),
    anchor: N.Point(20, 20)
  };
  let marker3 = {
    content: '<div style="cursor:pointer;width:34px;height:34px;line-height:34px;font-size:10px;color:white;background-color:#397400;border-radius:50%;text-align:center;font-weight:bold;"></div>',
    size: N.Size(40, 40),
    anchor: N.Point(20, 20)
  };
  let marker4 = {
    content: '<div style="cursor:pointer;width:36px;height:36px;line-height:36px;font-size:10px;color:white;background-color:#033E00;border-radius:50%;text-align:center;font-weight:bold;"></div>',
    size: N.Size(40, 40),
    anchor: N.Point(20, 20)
  };
  let marker5 = {
    content: '<div style="cursor:pointer;width:38px;height:38px;line-height:38px;font-size:10px;color:white;background-color:#002100;border-radius:50%;text-align:center;font-weight:bold;"></div>',
    size: N.Size(40, 40),
    anchor: N.Point(20, 20)
  };

  return [marker1, marker2, marker3, marker4, marker5];
};