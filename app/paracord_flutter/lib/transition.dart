import 'dart:math';

import 'package:flutter/material.dart';

/// Animates the swapping of multiple widgets.
class SwapTransition extends AnimatedWidget {
  /// Creates a swap transition.
  ///
  /// The [progress] argument must not be null.
  const SwapTransition({
    Key key,
    @required Animation<double> progress,
    this.alignment = Alignment.center,
    this.children,
  })  : assert(progress != null),
        super(key: key, listenable: progress);

  Animation<double> get progress => listenable;

  /// The alignment of the origin of the coordinate system around which the
  /// rotation occurs, relative to the size of the box.
  ///
  /// For example, to set the origin of the rotation to top right corner, use
  /// an alignment of (1.0, -1.0) or use [Alignment.topRight]
  final Alignment alignment;

  /// The widget below this widget in the tree.
  ///
  /// {@macro flutter.widgets.child}
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final double progressValue = progress.value;
    final int index = progressValue.round();
    final double scaleFactor = 1 - 2 * (progressValue - index).abs();
    final Matrix4 transform = Matrix4.rotationZ(pi * (progressValue + index))
      ..scale(scaleFactor, scaleFactor, 1.0);
    return Transform(
      transform: transform,
      alignment: alignment,
      child: children[index],
    );
  }
}
